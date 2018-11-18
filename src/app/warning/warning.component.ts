import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { Warning } from '../models/warning'
import { SelectionModel } from '@angular/cdk/collections'
import swal from 'sweetalert'
import { DialogDataDialogComponent } from './dialog-data/dialog-data.component'
import { Http } from '@angular/http'
import { NavbarService } from '../shared/navbar/navbar.service'

const flash_data: any[] = []

@Component({
  selector: 'component-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: Http, private navServ: NavbarService) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<Warning>(true, [])
  createType: string
  url: string

  displayedColumns = ['select', 'sku', 'name', 'qty. unsold', 'status', 'projectedExpiry']
  curField: any

  ngOnInit(): void {
    this.navServ.newEvent(0)
    const arr1 = JSON.parse(localStorage.getItem('showTable'))
    console.log(arr1.map(e => {

    return e.expiryDate
  }))

    console.log(arr1[0].expiryDate)

    if (localStorage.getItem('warning')) {
    const arr2 = JSON.parse(localStorage.getItem('warning'))
    console.log(arr2)
    this.dataSource.data = arr2

    this.dataSource.data.forEach(element => {
      element['qty_unsold'] = 60
      element['status'] = 'bad'
      element['projectedExpiry'] = arr1[0].expiryDate
    })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    }
  }

  public getJSON(): any {

    return this.http.get('./static/mock_flash.json')
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
    //   // this.curField = flash_data.filter(i => i.sku === e)[0]
    const itemArray = []
    if (this.selection.selected.length === 0) {
      alert('Please select a row(s)')
    }
    else {
    this.selection.selected.forEach(item => {
        console.log(item)
        itemArray.push(item)
        this.createType = 'Flash Sale'
        this.url = 'flash-sales'
        // this.curField = flash_data.findIndex(d => d === item.sku)
      })
    console.log(itemArray)
    this.dialog.open(DialogDataDialogComponent, {
      data: {
        data: [itemArray, this.createType, this.url]
      }
    })
  }
  }

  donateRows(): void {
    // console.log(e)
    // if (e !== undefined) {
    //   // this.curField = flash_data.filter(i => i.sku === e)[0]
    const itemArray = []
    if (this.selection.selected.length === 0) {
      alert('Please select a row(s)')
    }
    else {
    this.selection.selected.forEach(item => {
      console.log(item)
      itemArray.push(item)
      this.createType = 'Donation'
      this.url = 'donate-dispose/donate-food'
      // this.curField = flash_data.findIndex(d => d === item.sku)
    })
    console.log(itemArray)
    this.dialog.open(DialogDataDialogComponent, {
      data: {
        data: [itemArray, this.createType, this.url]
      }
    })
  }
  }

  disposeRows(): void {
    // console.log(e)
    // if (e !== undefined) {
    //   // this.curField = flash_data.filter(i => i.sku === e)[0]
    const itemArray = []
    if (this.selection.selected.length === 0) {
      alert('Please select a row(s)')
    }
    else {
    this.selection.selected.forEach(item => {
      console.log(item)
      itemArray.push(item)
      this.createType = 'Disposal'
      this.url = 'donate-dispose/dispose-food'
      // this.curField = flash_data.findIndex(d => d === item.sku)
    })
    console.log(itemArray)
    this.dialog.open(DialogDataDialogComponent, {
      data: {
        data: [itemArray, this.createType, this.url]
      }
    })
  }
  }

  removeSelectedRows(): void {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this warning!',
      icon: 'warning',
      buttons: ['Yes', 'No'],
      dangerMode: true
    })
      .then(willDelete => {
        if (!willDelete) {
          this.selection.selected.forEach(item => {
            const index: number = flash_data.findIndex(d => d === item)
            console.log('++++++++++++++++++==')
            // this.loadInventoryJsonService.deleteRow(item.item_id)
          })
          swal('Your warning has been deleted!', {
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
          swal('Warning not removed')
            .then(log => {
              console.log(log)

              return true
            })
            .catch(err => {
              console.log(err)

              return false
            })
        }

        return true
      })
      .catch(err => {
        console.log(err)

        return false
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
