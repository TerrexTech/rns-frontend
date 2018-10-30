import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { Employee } from '../../models/employee'
import { SelectionModel } from '@angular/cdk/collections'
import swal from 'sweetalert'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { AddDialogDataComponent } from '../add-dialog-data/add-dialog-data.component'
import { FlashSale } from '../../models/flash-sale'
import { Http } from '@angular/http'

let flash_data: any[] = []
@Component({
  selector: 'component-view-flashsale',
  templateUrl: './view-flashsale.component.html',
  styleUrls: ['./view-flashsale.component.css']
})
export class ViewFlashsaleComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: Http) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<Employee>(true, [])

  displayedColumns = ['select', 'upc', 'sku', 'name',
                      'origin', 'device_id', 'price', 'sale_price', 'ethylene', 'status', 'timestamp', 'modify']
  // displayedColumns = ['select', 'sku', 'name', 'leftover waste', 'status', 'projected expiry', 'modify']
  curField: any

  ngOnInit(): void {
    this.getJSON()
      .subscribe(data => {
        console.log(JSON.parse(data._body))
        const json = JSON.parse(data._body)
        this.dataSource.data = json
        flash_data = json
      })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort

  }

  public getJSON(): any {

    return this.http.get('./static/mock_flash.json')
  }

  addNewFlashSale(): void {
    this.dialog.open(AddDialogDataComponent, {
    })
  }

  populateFields(e): FlashSale {
    console.log(e)
    if (e !== undefined) {
      this.curField = flash_data.filter(i => i.upc === e)[0]
      console.log(this.curField)
      this.dialog.open(DialogDataDialogComponent, {
        data: {
          data: this.curField
        }
      })
      // this.formDate.nativeElement.value = this.curField.date_arrived
      console.log()
    }

    return e
  }

  removeSelectedRows(): void {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
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
          swal('Poof! Your imaginary file has been deleted!', {
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
