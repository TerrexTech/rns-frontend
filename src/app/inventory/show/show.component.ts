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

let Food: Inventory[] = []

@Component({
  selector: 'component-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {
  food: Inventory
  displayedColumns: string[] =
  ['select' , 'upc', 'sku', 'name', 'origin', 'location', 'date_arrived', 'expiry_date', 'sold_weight', 'total_weight']
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('query') query: ElementRef
  @ViewChild('field') field: ElementRef
  @ViewChild('formDate') formDate: ElementRef
  curField: any
  returnVal: any

  selection = new SelectionModel<Inventory>(true, [])

  constructor(private http: Http, public dialog: MatDialog, private showService: ShowTableService) {
  }

  ngOnInit(): void {
    // this.loadInventoryJsonService.getJSON()
    //   .subscribe(data => {
    //     console.log(data)
    //     this.dataSource.data = data
    //     Food = data
    //   })
    this.showService.getTable()
                    .subscribe(data => {
                      console.log(data[0])
                      this.dataSource.data = data[0]
                    })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  resetData(): void {
    // this.loadInventoryJsonService.getJSON()
    //   .subscribe(data => {
    //     console.log(data)
    //     this.dataSource.data = data
    //     Food = data
    //   })
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
            // this.loadInventoryJsonService.deleteRow(item.item_id)
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
    })
  }

  genWarning(): void {
   // this.returnVal

    this.selection.selected.forEach(item => {
      this.curField = Food.filter(i => i.itemId === item.itemId)[0]
      console.log(this.curField)
      console.log('++++++++++++++++++==')

      this.showService.sendWarning(this.curField)
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
          .subscribe(data => {
             console.log(data)
             this.dataSource.data = data[0]
             Food = data[0]
           })
      // this.loadInventoryJsonService.getJSON()
      //     .subscribe(data => {
      //       console.log(data)
      //       this.dataSource.data = data
      //       Food = data
      //   })
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
