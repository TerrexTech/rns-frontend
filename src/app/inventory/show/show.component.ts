import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Http } from '@angular/http'
import { Inventory } from '../../models/inventory'
import { SelectionModel } from '@angular/cdk/collections'
import { TableSearchComponent } from '../../search/table-search/table-search.component'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { InventoryService } from '../inventory.service'
import swal from 'sweetalert'
import { NavbarService } from '../../shared/navbar/navbar.service'

let Food: Inventory[] = []
const ProjectedExpiry: number[] = []

@Component({
  selector: 'component-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {
  food: Inventory
  displayedColumns: string[] =
    ['select', 'upc', 'sku', 'name', 'origin', 'lot', 'dateArrived', 'expiryDate', 'soldWeight', 'totalWeight']
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('query') query: ElementRef
  @ViewChild('field') field: ElementRef
  @ViewChild('formDate') formDate: ElementRef
  curField: any
  returnVal: any
  alertShown = false

  selection = new SelectionModel<Inventory>(true, [])

  constructor(private http: Http, public dialog: MatDialog, private showService: InventoryService,
              private navServ: NavbarService) {
  }

  ngOnInit(): void {

    this.showService.getTable()
      .toPromise()
      .then((data: any) => {
        console.log(data.data.InventoryQueryCount)
        this.dataSource.data = data.data.InventoryQueryCount
        Food = data.data.InventoryQueryCount
        this.genExpiry()
      }
      )
      .catch()

    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  genExpiry(): void {
    this.dataSource.data.forEach(element => {

      element['expiryDate'] = (element['dateArrived'] + (86400 * 5))
    })
  }

  loadExpiry(): void {
    let item: Inventory
    this.selection.selected.forEach(selItem => {
      item = selItem
    })
    console.log(item)

    const row = this.dataSource.data.findIndex(rowData =>  rowData['itemID'] === item.itemID)
    this.dataSource.data[row]['expiryDate'] = (this.dataSource.data[row]['dateArrived'] + (86400 * 13))
    this.dataSource.data[row]['soldWeight'] = 50

  }

  sendSale(saleData: Inventory): void {
      this.showService.insertSale(saleData)
                      .toPromise()
                      .catch()
      swal('Sale Inserted')
          .catch(console.log)
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

  onPaginateChange($event): void {
    const date = new Date().getTime()
    const date2 = new Date().getTime() / 1000
    if ($event.pageIndex > $event.previousPageIndex) {
      console.log(1)
      console.log(date)
      console.log(date2)
    }
    else if ($event.pageIndex < $event.previousPageIndex) {
      console.log(2)
    }
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
      this.curField = Food.filter(i => i.itemID === item.itemID)[0]
      console.log(this.curField)
      console.log('++++++++++++++++++==')
      // this.showService.getQuery(this.curField)
      //   .toPromise()
      //   .then((data: any) => {
      //     console.log(data.data)
      //     this.dataSource.data = data.data
      //   }
      //   )
      //   .catch()
      // this.resetData()
    })
    this.loadExpiry()
    this.sendSale(this.curField)
    const array2 = []
    console.log(localStorage.getItem('showTable') !== undefined)
    if (localStorage.getItem('showTable') === undefined) {

        return JSON.parse(localStorage.getItem('showTable'))
    }

    else {
        for (let index = 0; index < 10; index++) {
            array2.push({
              expiryDate: this.curField.expiryDate
            })
        }
        localStorage.setItem('showTable', JSON.stringify(array2))
    }
    console.log(array2)
    }

  genWarning(): void {
    this.selection.selected.forEach(item => {
      this.curField = Food.filter(i => i.itemID === item.itemID)[0]
      console.log(this.curField)
      this.alertShown = true
      this.navServ.newEvent(1)
      console.log(this.curField)

      const array1 = []
      console.log(localStorage.getItem('warning') !== undefined)
      if (localStorage.getItem('warning') === undefined) {

        return JSON.parse(localStorage.getItem('warning'))
      }
      else {
          array1.push(this.curField)
      }
      localStorage.setItem('warning', JSON.stringify(array1))

      // ethylene value jumps to 700

      // projected date (timestamp) becomes closer
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
  }

  populateFields(): void {
    this.selection.selected.forEach(item => {
      this.curField = Food.filter(i => i.itemID === item.itemID)[0]
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
            // if (data) {
             console.log(data.data.InventoryQueryCount)
             this.dataSource.data = data.data.InventoryQueryCount
             Food = data.data.InventoryQueryCount
            // }
          }
          )
          .catch()
      })
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length

    return numSelected === numRows
  }

  /** Selects all rows if they are not all selected otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row))
  }
}
