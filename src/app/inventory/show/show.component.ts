import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Http } from '@angular/http'
// import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'
import { Inventory } from '../../models/inventory'
import { SelectionModel } from '@angular/cdk/collections'
import { SearchComponent } from '../../search/search.component'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import swal from 'sweetalert'

const Food: Inventory[] = []

@Component({
  selector: 'component-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {
  food: Inventory
  displayedColumns: string[] =
  ['select' , 'upc', 'sku', 'name', 'origin', 'location', 'date_arrived', 'expiry_date', 'sale_price', 'total_weight', 'modify']
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('query') query: ElementRef
  @ViewChild('field') field: ElementRef
  @ViewChild('formDate') formDate: ElementRef
  curField: any

  selection = new SelectionModel<Inventory>(true, [])

  constructor(private http: Http, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.loadInventoryJsonService.getJSON()
    //   .subscribe(data => {
    //     console.log(data)
    //     this.dataSource.data = data
    //     Food = data
    //   })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  getSearchData(query, field): void {
    // this.loadInventoryJsonService.getSearchJSON(query, field)
    //   .subscribe(data => {
    //     console.log(data)
    //     this.dataSource.data = data
    //     Food = data
    //   })
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
    this.dialog.open(SearchComponent, {
      width: '500px'
    })
      .afterClosed()
      .subscribe(
        data => console.log(data)
        // refreshDataMethod()
      )
  }

  // make method more efficient in future
  removeSelectedRows(): void {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this fruit!',
      icon: 'warning',
      buttons: ['Yes', 'No'],
      dangerMode: true
    })
      .then(willDelete => {
        if (!willDelete) {
          this.selection.selected.forEach(item => {
            const index: number = Food.findIndex(d => d === item)
            console.log('++++++++++++++++++==')
            console.log(item.item_id)
            // this.loadInventoryJsonService.deleteRow(item.item_id)
            this.resetData()
          })
          swal('Your fruit has been deleted!', {
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
    console.log(this.selection.selected.length)
    if (this.selection.selected.length >= 2) {
      return true
    }

    return false
  }

  populateFields(): void {
    // console.log(e)
    // if (e !== undefined) {
    //   this.curField = Food.filter(i => i.item_id === e)[0]
    this.selection.selected.forEach(item => {
      this.curField = Food.filter(i => i.item_id === item.item_id)[0]
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
      // this.loadInventoryJsonService.getJSON()
      //     .subscribe(data => {
      //       console.log(data)
      //       this.dataSource.data = data
      //       Food = data
      //   })
    })
  }

  onSearch(): void {
    const query = this.query.nativeElement.value
    const field = this.field.nativeElement.value
    this.getSearchData(query, field)
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
