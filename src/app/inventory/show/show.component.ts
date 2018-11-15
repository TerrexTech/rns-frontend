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

  constructor(private http: Http, public dialog: MatDialog, private showService: ShowTableService,
              private navServ: NavbarService) {
  }

  ngOnInit(): void {

    this.showService.getTable()
      .toPromise()
      .then((data: any) => {
        console.log(data.data.InventoryQueryCount)
        this.dataSource.data = data.data.InventoryQueryCount
        Food = data.data.InventoryQueryCount
      }
      )
      .catch()

    // setInterval(() => {
    //   this.loadExpiry()
    // })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  loadExpiry(): void {

    this.dataSource.data.forEach(element => {
      element['expiryDate'] = 2
    })
    // this.dataSource.data[0]['expiryDate'] = 2
    console.log(this.dataSource.data)
    this.dataSource.data = this.dataSource.data
    // this.showService.getTable()
    //                 .toPromise()
    //                 .then((data: any) => {
    //                   console.log(data.data.InventoryQuery)
    //                   this.dataSource.data['expiryDate'] = 2
    //                   Food['expiryDate'] = 2
    //                 }
    //                 )
    //                 .catch()
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
      this.returnVal = this.showService.getQuery(this.curField)
        .toPromise()
        .then((data: any) => {
          console.log(data.data)
          this.dataSource.data = data.data
        }
        )
        .catch()
      console.log(this.returnVal)
      this.resetData()
    })
  }

  genWarning(): void {
    this.selection.selected.forEach(item => {
      this.curField = Food.filter(i => i.itemID === item.itemID)[0]
      console.log(this.curField)
      this.alertShown = true
      this.curField.timestamp = this.curField.timestamp - 1000000
      this.navServ.setAlertCount(1)
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
      // bell number increases
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
      }
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
