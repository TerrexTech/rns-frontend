import { Component, OnInit } from '@angular/core'
import {
  MatDialog,
  MatSortable,
  MatTableDataSource
} from '@angular/material'
import { Http } from '@angular/http'
import { Inventory } from '../../models/inventory'
import { SelectionModel } from '@angular/cdk/collections'
import { TableSearchComponent } from '../../search/table-search/table-search.component'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { InventoryService } from '../inventory.service'
import swal from 'sweetalert'
import { NavbarService } from '../../shared/navbar/navbar.service'

let paginator: Inventory[] = []

@Component({
  selector: 'component-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {
  displayedColumns: string[] =
    ['select', 'upc', 'sku', 'name', 'origin', 'lot', 'dateArrived', 'projectedDate', 'soldWeight', 'totalWeight', 'leftover']
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  curField: any
  Math: any
  alertShown = false
  lastTimestamp: number
  startForwardTime: number
  backEndTime: number
  projectedDate: number
  selection = new SelectionModel<Inventory>(true, [])
  inventoryPageBrowse = []
  checkPopInv: Boolean

  constructor(private http: Http, public dialog: MatDialog, private showService: InventoryService,
              private navServ: NavbarService) {
    this.Math = Math
  }

  ngOnInit(): void {
    this.showService.getTable()
      .toPromise()
      .then((data: any) => {
        if (data.data.InventoryQueryCount) {
          console.log(data.data.InventoryQueryCount)
          this.dataSource.data = data.data.InventoryQueryCount.map(e => {
            e.isRed = false

            return e
          })
          paginator = data.data.InventoryQueryCount
          this.inventoryPageBrowse.push(paginator)
          console.log(paginator.length, '8787878788787')
          this.lastTimestamp = data.data.InventoryQueryCount[0].timestamp
          this.genExpiry()
        }
        else {
          alert('Timed out.')
        }

      }
      )
      .catch(() => {
        swal('Table data not loaded')
          .catch(err => console.log(err))
      })

    const sorting: MatSortable = {
      id: 'timestamp',
      start: 'desc',
      disableClear: false
    }
  }

  getRandomInt(min, max): number {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
  }

  genExpiry(): void {
    this.dataSource.data.forEach(element => {
      element['soldWeight'] = Math.round(element['soldWeight'])
        .toFixed(2)
      element['totalWeight'] = Math.round(element['totalWeight'])
        .toFixed(2)
      element['projectedDate'] = (element['dateArrived'] + (this.getRandomInt(8, 16) * 86400))
    })
  }

  changeExpirySold(min, max, soldWeight): void {
    let item: Inventory
    this.selection.selected.forEach(selItem => {
      item = selItem
    })
    console.log(item)
    console.log(soldWeight)

    const row = this.dataSource.data.findIndex(rowData => rowData['itemID'] === item.itemID)
    console.log(((this.getRandomInt(min, max) * 86400)))
    this.dataSource.data[row]['projectedDate'] = (this.dataSource.data[row]['projectedDate'] + (this.getRandomInt(min, max) * 86400))
    const soldVal = Number(this.dataSource.data[row]['soldWeight'])
    const requestedSoldValue = soldVal + soldWeight
    const totalWeight = Number(this.dataSource.data[row]['totalWeight'])
    const leftoverWeight = Number(Math.round(totalWeight - requestedSoldValue)
      .toFixed(2))

    console.log(totalWeight - requestedSoldValue)
    if (leftoverWeight < 1) {
      this.dataSource.data[row]['soldWeight'] = this.dataSource.data[row]['totalWeight']
      this.dataSource.data[row]['leftover'] = this.dataSource.data[row]['totalWeight'] - this.dataSource.data[row]['soldWeight']
    }

    if (soldVal < totalWeight &&
      requestedSoldValue < totalWeight) {
      this.showService.updateItem(item)
        .toPromise()
        .then((data: any) => {
          if (data.data.InventoryUpdate) {
            console.log(data)
            this.dataSource.data[row]['soldWeight'] = Number(Math.round(requestedSoldValue)
              .toFixed(2))
            localStorage.setItem('soldWeight', requestedSoldValue)
          }
        })
        .catch(async () => swal('Error: Unable to update sold weight')
          .catch(() => console.log('popup not loaded')))
    }
  }

  changeExpiryWarning(min, max): void {
    this.selection.selected.forEach(selItem => {
      const row = this.dataSource.data.findIndex(rowData => rowData['itemID'] === selItem.itemID)
      this.dataSource.data[row]['projectedDate'] = (this.dataSource.data[row]['timestamp'] + (this.getRandomInt(min, max) * 86400))
      this.projectedDate = Number(this.dataSource.data[row]['projectedDate'])
    })
  }

  sendSale(saleData): void {
    this.showService.insertSale(saleData)
      .toPromise()
      .then((data: any) => {
        console.log(data)
      })
      .catch()
  }

  resetData(): void {
    this.showService.getTable()
      .toPromise()
      .then((data: any) => {
        console.log(data.data.InventoryQueryCount)
        this.dataSource.data = data.data.InventoryQueryCount
        this.genExpiry()
      }
      )
      .catch()
  }

  onPaginateBack(): void {
    // const lengthOfInvArray = this.inventoryPageBrowse.length
    // const lengthOfDataSource = this.dataSource.data
    // for (let i = lengthOfInvArray - 1; i > 0; i --) {
    //   paginatorArray.push(this.inventoryPageBrowse[i])
    // }

    if (this.checkPopInv) {
      this.checkPopInv = false
      this.inventoryPageBrowse.pop()
    }

    let invArr = this.inventoryPageBrowse[0]
    if (this.inventoryPageBrowse.length > 1) {
     invArr = this.inventoryPageBrowse.pop()
    }

    console.log(paginator, '88888888888888888')

    if (paginator && paginator.length > 0) {
      paginator = invArr
      this.dataSource.data = invArr
    }
    this.genExpiry()

    // this.backEndTime = paginator[paginator.length - 1].timestamp
    // console.log(paginator[0], '###############')
    // // console.log(paginator[paginator.length - 1].timestamp)
    // console.log(this.lastTimestamp)
    // this.showService.paginateTable(paginator[0].timestamp, this.backEndTime)
    // .toPromise()
    // .then((data: any) => {
    //   console.log(data)
    //   if (data.data.InventoryQueryTimestamp.length > 0) {
    //     paginator = data.data.InventoryQueryTimestamp
    //     console.log(paginator.length, '@@@@@@@@@@@@@@')
    //     this.dataSource.data = paginator
    //     this.genExpiry()
    //   }
    // })
    // .catch(() => {
    //   swal('Table data not loaded')
    //       .catch(err => console.log(err))
    // })
  }

  onPaginateForward(): void {
    if (paginator && paginator.length > 0) {
      // !this.startForwardTime ?  this.startForwardTime = 1 : this.startForwardTime = paginator[paginator.length - 1].timestamp
      this.startForwardTime = paginator[paginator.length - 1].timestamp
      // console.log(this.startForwardTime)
      // console.log(paginator[paginator.length - 1].timestamp)
      this.showService.paginateTable(1, this.startForwardTime)
        .toPromise()
        .then((data: any) => {
          console.log(data.data.InventoryQueryTimestamp)
          // paginator = data.data.InventoryQueryTimestamp
          console.log(paginator.length, '###################')
          if (data.data.InventoryQueryTimestamp.length > 0) {
            paginator = data.data.InventoryQueryTimestamp
            console.log(paginator.length, '@@@@@@@@@@@@@@')
            this.inventoryPageBrowse.push(paginator)
            console.log(this.inventoryPageBrowse, '^^^^^^^^^^^^^^^')
            this.dataSource.data = paginator
            this.genExpiry()
            this.checkPopInv = true
          }
          // this.lastTimestamp = data.data.InventoryQueryTimestamp[0].timestamp
        })
        .catch(() => {
          swal('Table data not loaded')
            .catch(err => console.log(err))
        })
    }
    else {

    }

  }

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px'
    })
      .afterClosed()
      .subscribe(
        data => {
          if (data) {
            console.log(data)
            if (!data) {
              this.resetData()
            }
            if (data.queryNum === 1) {
              this.dataSource.data = data.data.InventoryQueryItem
            }
            else if (data.queryNum === 2) {
              this.dataSource.data = data.data.InventoryQueryTimestamp
            }
            else if (!data.queryNum) {
              console.log('Search closed')
            }
            this.genExpiry()
          }
        }
        // refreshDataMethod()
      )
  }

  async removeSelectedRows(): Promise<any> {

    const willDelete = await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this item!',
      icon: 'warning',
      buttons: ['Yes', 'No'],
      closeOnClickOutside: false,
      closeOnEsc: false,
      dangerMode: true
    })
    if (!willDelete) {
      const selectedItemIDs = this.selection.selected.map(item => item.itemID)
      console.log(selectedItemIDs)

      for (const itemID of selectedItemIDs) {
        try {
          const deleteResult = await this.showService.deleteRows(itemID)
            .toPromise()
        }
        catch (e) {
          swal('Inventory not removed')
            .catch(console.log)
        }
      }
      this.resetData()
      swal('Your item has been deleted!', {
        icon: 'success'
      })
        .catch(console.log)
    }
  }

  selected(): boolean {
    if (this.selection.selected.length >= 2) {
      return true
    }

    return false
  }

  canUpdate(): boolean {
    if (this.selection.selected.length < 1 || this.selection.selected.length > 1) {
      return true
    }

    return false
  }

  canDelete(): boolean {
    if (this.selection.selected.length < 1) {
      return true
    }

    return false
  }

  genSold(): void {
    this.selection.selected.forEach(item => {
      this.curField = paginator.filter(i => i.itemID === item.itemID)[0]
      console.log(this.curField)
      console.log('++++++++++++++++++==')
      // this.showService.getQuery(this.curField)
      //   .toPromise()
      //   .then((data: any) => {
      //     if (data.data) {
      //     console.log(data.data)
      //     this.dataSource.data = data.data
      //     }
      //     else {
      //       alert("Sale Not Created")
      //     }
      //   }
      //   )
      //   .catch()
      // this.resetData()
    })
    this.changeExpirySold(3, 5, this.curField.totalWeight / 5)
  }

  async genWarning(): Promise<any> {
    const selectedItems = this.selection.selected.map(item => item)
    console.log(selectedItems)

    this.selection.selected.forEach(item => {
      item.isRed = true
      this.changeExpiryWarning(2, 4)
      item.projectedDate = this.projectedDate
      this.curField = paginator.filter(i => i.itemID === item.itemID)[0]
      this.alertShown = true
      this.navServ.newEvent(this.selection.selected.length)
      console.log('++++++++++++++++++==')
    })

    for (const item of selectedItems) {
      try {
        item.warningActive = true
        item.ethylene = this.getRandomInt(1300, 1700)
        item.carbonDioxide = this.getRandomInt(2800, 3000)
        const genWarnings = await this.showService.sendWarning(item)
          .toPromise()
          .then((data: any) => {
            if (data.data.WarningInsert) {
              console.log(data)
            }
            else {
              swal('Warning has already been generated for selected item(s)')
                .catch(err => console.log(err))
            }
          })
          .catch(async () => swal('one item may not have two warnings.')
            .catch(err => console.log(err))
          )
      }
      catch (e) {
        swal('Inventory not removed')
          .catch(console.log)
      }
    }
  }

  populateFields(): void {
    this.selection.selected.forEach(item => {
      this.curField = paginator.filter(i => i.itemID === item.itemID)[0]
      console.log(this.curField)
      console.log('++++++++++++++++++==')
    })
    this.dialog.open(DialogDataDialogComponent, {
      width: '500px',
      data: {
        data: this.curField
      },
      disableClose: true
    })
      .afterClosed()
      .subscribe(result => {
        this.showService.getTable()
          .toPromise()
          .then((data: any) => {
            if (data.data.InventoryQueryCount) {
              console.log(data.data.InventoryQueryCount)
              this.dataSource.data = data.data.InventoryQueryCount
              paginator = data.data.InventoryQueryCount
            }
          }
          )
          .catch(() => alert('Timed out.'))
      })
  }
}
