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
  statusMessage: string

  displayedColumns = ['select', 'sku', 'name', 'qty. unsold', 'status', 'projectedExpiry']
  curField: any

  ngOnInit(): void {
    const oneday = 86400
    const twoday = oneday * 2
    const threeday = oneday * 3
    const today = new Date().getTime() / 1000

    if (localStorage.getItem('warning')) {
    const arr2 = JSON.parse(localStorage.getItem('warning'))
    console.log(arr2)
    this.dataSource.data = arr2

    let index = 0
    this.dataSource.data.forEach(element => {
      console.log(index)
      console.log(arr2[index])
      element['qty_unsold'] = arr2[index].totalWeight - arr2[index].soldWeight
      console.log(arr2[index].expiryDate - today)

      if (arr2[index].expiryDate - today <= threeday) {
      element['status'] = 'bad'
      this.statusMessage = 'Expiring soon'
      element['projectedExpiry'] = arr2[index].expiryDate
    }

      else if (arr2[index].expiryDate - today <= oneday) {
        element['status'] = 'bad'
        this.statusMessage = 'Act now'
        element['projectedExpiry'] = arr2[index].expiryDate
      }
      index++
    })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    }
    else {
      swal('No Warnings present')
      .catch(() => console.log('popup failed: warning page'))
    }

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
      swal('Please select a row(s)')
      .catch(() => console.log('popup failed: warning page'))
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
      swal('Please select a row(s)')
      .catch(() => console.log('popup failed: warning page'))
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
      swal('Please select a row(s)')
      .catch(() => console.log('popup failed: warning page'))
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
