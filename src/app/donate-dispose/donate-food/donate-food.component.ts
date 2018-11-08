import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'
import swal from 'sweetalert'
import { Http } from '@angular/http'
import { Warning } from '../../models/warning'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'

let donate: any[] = []

@Component({
  selector: 'component-donate-food',
  templateUrl: './donate-food.component.html',
  styleUrls: ['./donate-food.component.css']
})
export class DonateFoodComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: Http) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<Warning>(true, [])

  displayedColumns = ['select', 'sku', 'name', 'leftover waste', 'status', 'projected expiry']
  curField: any

  ngOnInit(): void {
    this.getJSON()
      .subscribe(data => {
        console.log(JSON.parse(data._body))
        const json = JSON.parse(data._body)
        this.dataSource.data = json
        donate = json
      })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort

  }

  public getJSON(): any {

    return this.http.get('./static/mock_flash.json')
  }

  populateFields(): void {
    // console.log(e)
    // if (e !== undefined) {
    //   // this.curField = flash_data.filter(i => i.sku === e)[0]
    this.selection.selected.forEach(item => {
      console.log(item)
      this.curField = item
      // this.curField = flash_data.findIndex(d => d === item.sku)
      console.log(this.curField)
    })
    this.dialog.open(DialogDataDialogComponent, {
      data: {
        data: [this.curField, 'Donate']
      }
    })
  }

  // removeSelectedRows(): void {

  //   swal({
  //     title: 'Are you sure?',
  //     text: 'Once deleted, you will not be able to recover this imaginary file!',
  //     icon: 'warning',
  //     buttons: ['Yes', 'No'],
  //     dangerMode: true
  //   })
  //     .then(willDelete => {
  //       if (!willDelete) {
  //         this.selection.selected.forEach(item => {
  //           const index: number = flash_data.findIndex(d => d === item)
  //           console.log('++++++++++++++++++==')
  //           // this.loadInventoryJsonService.deleteRow(item.item_id)
  //         })
  //         swal('Poof! Your imaginary file has been deleted!', {
  //           icon: 'success'
  //         })
  //           .then(log => {
  //             console.log(log)

  //             return true
  //           })
  //           .catch(err => {
  //             console.log(err)

  //             return false
  //           })
  //       } else {
  //         swal('Inventory not removed')
  //           .then(log => {
  //             console.log(log)

  //             return true
  //           })
  //           .catch(err => {
  //             console.log(err)

  //             return false
  //           })
  //       }

  //       return true
  //     })
  //     .catch(err => {
  //       console.log(err)

  //       return false
  //     })
  // }

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

}
