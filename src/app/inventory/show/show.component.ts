import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import {
  MatDialog,
  MatPaginator,
  MatRow,
  MatSort,
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
const ProjectedExpiry: number[] = []

@Component({
  selector: 'component-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {
  food: Inventory
  displayedColumns: string[] =
    ['select', 'upc', 'sku', 'name', 'origin', 'lot', 'dateArrived', 'expiryDate', 'soldWeight', 'totalWeight', 'leftover']
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  curField: any
  Math: any
  returnVal: any
  alertShown = false
  lastTimestamp: number
  startForwardTime: number
  backEndTime: number

  @ViewChild('invTable') invTable: ElementRef

  selection = new SelectionModel<Inventory>(true, [])

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
          this.lastTimestamp = data.data.InventoryQueryCount[0].timestamp
          this.genExpiry()
          console.log('==================')
          console.log(this.invTable)
          console.log(this.invTable.nativeElement)
        }
        else {
          alert('Timed out.')
        }

      }
      )
      .catch()

    this.dataSource.paginator = this.paginator
    const sorting: MatSortable = {
      id: 'Sold Weight',
      start: 'desc',
      disableClear: false
    }
    this.sort.sort(sorting)
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
      element['expiryDate'] = (element['dateArrived'] + (this.getRandomInt(8, 16) * 86400))
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
    this.dataSource.data[row]['expiryDate'] = (this.dataSource.data[row]['expiryDate'] + (this.getRandomInt(min, max) * 86400))
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
      this.dataSource.data[row]['expiryDate'] = (this.dataSource.data[row]['timestamp'] + (this.getRandomInt(min, max) * 86400))
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
      }
      )
      .catch()
  }

  onPaginateBack(): void {
    this.backEndTime = 9999999999
    console.log(paginator[0].timestamp)
    console.log(paginator[paginator.length - 1].timestamp)
    console.log(this.lastTimestamp)
    this.showService.paginateTable(paginator[0].timestamp, this.backEndTime)
      .toPromise()
      .then((data: any) => {
        console.log(data)
        paginator = data.data.InventoryQueryTimestamp
        this.dataSource.data = paginator
      })
      .catch(console.log)
  }

  onPaginateForward(): void {
    this.startForwardTime = 1
    this.showService.paginateTable(this.startForwardTime, paginator[paginator.length - 1].timestamp)
      .toPromise()
      .then((data: any) => {
        console.log(data.data.InventoryQueryTimestamp)
        paginator = data.data.InventoryQueryTimestamp
        this.dataSource.data = paginator
        // this.lastTimestamp = data.data.InventoryQueryTimestamp[0].timestamp
      })
      .catch(console.log)
  }

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px'
    })
      .afterClosed()
      .subscribe(
        data => {
          console.log(data)
          this.dataSource.data = data[0]
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
    const array2 = []
    for (let index = 0; index < 10; index++) {
      array2.push({
        expiryDate: this.curField.expiryDate
      })
    }
    localStorage.setItem('showTable', JSON.stringify(array2))
    console.log(array2)
  }

  genWarning(): void {
    // this.status = 'red'
    const array1 = []
    const ethyVal = '1300'
    const co2Val = '3900'
    this.selection.selected.forEach(item => {
      item.isRed = true
      // max value must be +1
      this.changeExpiryWarning(2, 4)
      this.curField = paginator.filter(i => i.itemID === item.itemID)[0]
      console.log(this.curField)
      this.alertShown = true
      this.navServ.newEvent(this.selection.selected.length)
      console.log(this.curField)

      if (localStorage.getItem('warning') === undefined) {

        return JSON.parse(localStorage.getItem('warning'))
      }
      else {
        array1.push(this.curField)
      }
      // this.showService.sendWarning(this.curField)
      //   .toPromise()
      //   .then((data: any) => {
      //     console.log(data.data)
      //     this.dataSource.data = data.data
      //   }
      //   )
      //   .catch()
      console.log('++++++++++++++++++==')
    })
    localStorage.setItem('warning', JSON.stringify(array1))
    localStorage.setItem('ethyVal', ethyVal)
    localStorage.setItem('co2Val', co2Val)
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
            else {
              alert('Timed out.')
            }
          }
          )
          .catch()
      })
  }
}
