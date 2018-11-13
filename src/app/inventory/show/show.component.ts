import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Http } from '@angular/http'
// import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'
import { Inventory } from '../../models/inventory'
import { SelectionModel } from '@angular/cdk/collections'
import { TableSearchComponent } from '../../search/table-search/table-search.component'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { ShowTableService } from './show.service'
import swal from 'sweetalert'
import { AddInventoryService } from '../add/add.service'
import { NavbarService } from '../../shared/navbar/navbar.service'

let Food: Inventory[] = []

@Component({
  selector: 'component-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {
  food: Inventory
  displayedColumns: string[] =
  ['select' , 'upc', 'sku', 'name', 'origin', 'lot', 'dateArrived', 'expiryDate', 'soldWeight', 'totalWeight']
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('query') query: ElementRef
  @ViewChild('field') field: ElementRef
  @ViewChild('formDate') formDate: ElementRef
  curField: any
  returnVal: any
  alertShown = true

  selection = new SelectionModel<Inventory>(true, [])

  constructor(private http: Http, public dialog: MatDialog, private showService: ShowTableService,
              private addService: AddInventoryService, private navServ: NavbarService) {
  }

  ngOnInit(): void {
    // this.loadInventoryJsonService.getJSON()
    //   .subscribe(data => {
    //     console.log(data)
    //     this.dataSource.data = data
    //     Food = data
    //   })

    this.showService.getTable()
                    .toPromise()
                    .then((data: any) => {
                      console.log(data.data.InventoryQuery)
                      this.dataSource.data = data.data.InventoryQuery
                      Food = data.data.InventoryQuery
                    }
                    )
                    .catch()
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  resetData(): void {
    this.showService.getTable()
                    .toPromise()
                    .then((data: any) => {
                      console.log(data.data)
                      this.dataSource.data = data.data
                    }
                    )
                    .catch()
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

  removeSelectedRows(): void {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this item!',
      icon: 'warning',
      buttons: ['Yes', 'No'],
      dangerMode: true
    })
      .then(willDelete => {
        if (!willDelete) {
          this.selection.selected.forEach(item => {
            const index: number = Food.findIndex(d => d === item)
            console.log('++++++++++++++++++==')
            console.log(item.itemId)
            this.showService.deleteRows(item.itemId)
                            .toPromise()
                            .then((data: any) => {
                              console.log(data.data)
                            }
                            )
                            .catch()
            this.resetData()
          })
          swal('Your item has been deleted!', {
            icon: 'success'
          })
            .then(log => {
              console.log(log)

              return true
            })
            .catch(err => {
              console.log(err)

              return false
            })
        } else {
          swal('Inventory not removed')
            .then(log => {
              console.log(log)

              return true
            })
            .catch(err => {
              console.log(err)

              return false
            })
        }
      })
      .then(log => {
        console.log(log)

        return true
      })
      .catch(err => {
        console.log(err)

        return false
      })
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
      this.curField = Food.filter(i => i.itemId === item.itemId)[0]
      console.log(this.curField)
      console.log('++++++++++++++++++==')
      this.returnVal = this.showService.getQuery(this.curField)
                                       .toPromise()
                                       .then((data: any) => {
                                          console.log(data.data)
                                          this.dataSource.data = data.data
                                        }
                                        )
                                       .catch()
      console.log(this.returnVal)
      this.addService.addItem(this.returnVal)
                     .toPromise()
                     .then((data: any) => {
                        console.log(data.data)
                        this.dataSource.data = data.data
                      }
                      )
                     .catch()
      this.resetData()
    })
  }

  genWarning(): void {
    this.selection.selected.forEach(item => {
      this.curField = Food.filter(i => i.itemId === item.itemId)[0]
      console.log(this.curField)
      this.alertShown = true
      this.curField.ethylene = 700
      this.curField.timestamp = this.curField.timestamp - 1000000
      this.navServ.setAlertCount(1)
      // ethylene value jumps to 700
      // projected date (timestamp) becomes closer
      this.showService.sendWarning(this.curField)
                      .toPromise()
                      .then((data: any) => {
                        console.log(data.data)
                        this.dataSource.data = data.data
                      }
                      )
                      .catch()
      // bell number increases
      console.log('++++++++++++++++++==')
    })
  }

  populateFields(): void {
    // console.log(e)
    // if (e !== undefined) {
    //   this.curField = Food.filter(i => i.item_id === e)[0]
    this.selection.selected.forEach(item => {
      this.curField = Food.filter(i => i.itemId === item.itemId)[0]
      console.log(this.curField)
      console.log('++++++++++++++++++==')
    })
    this.dialog.open(DialogDataDialogComponent, {
        width: '500px',
        data: {
          data: this.curField
        }
      })
      .afterClosed()
      .subscribe(result => {
        this.showService.getTable()
                        .toPromise()
                        .then((data: any) => {
                          console.log(data.data)
                          this.dataSource.data = data.data
                          Food = data.data
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
