import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { Employee } from '../../models/employee'
import { SelectionModel } from '@angular/cdk/collections'
import swal from 'sweetalert'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { AddDialogDataComponent } from '../add-dialog-data/add-dialog-data.component'
import { FlashSale } from '../../models/flash-sale'
import { Http } from '@angular/http'
import { ViewFlashSaleService } from './view-flashsale.service'
import { AlertService } from '../../alert-popup/alert.service'
import { TableSearchComponent } from '../../search/table-search/table-search.component'

let flash_data: any[] = []
@Component({
  selector: 'component-view-flashsale',
  templateUrl: './view-flashsale.component.html',
  styleUrls: ['./view-flashsale.component.css']
})
export class ViewFlashsaleComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: Http, private viewService: ViewFlashSaleService,
              private alertService: AlertService) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<FlashSale>(true, [])

  displayedColumns = ['select', 'upc', 'sku', 'name',
                      'device_id', 'price', 'sale_price', 'ethylene', 'status', 'timestamp']
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

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px'
    })
      .afterClosed()
      .subscribe(
        data => flash_data = data
      )
    this.dataSource.data = flash_data
  }

  public getJSON(): any {

    return this.http.get('./static/mock_flash.json')
  }

  addNewFlashSale(): void {
    this.dialog.open(AddDialogDataComponent, {
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

  populateFields(): void {
     this.selection.selected.forEach(item => {
        this.curField = flash_data.filter(i => i.upc === item.upc)[0]
        console.log(this.curField)
        console.log('++++++++++++++++++==')
      })
     this.dialog.open(DialogDataDialogComponent, {
       minHeight: 600,
       minWidth: 1000,
       data: {
          data: this.curField
        }
      })
     console.log()
  }

  removeSelectedRows(): void {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this flash sale!',
      icon: 'warning',
      buttons: ['Yes', 'No'],
      dangerMode: true
    })
      .then(willDelete => {
        if (!willDelete) {
          this.selection.selected.forEach(item => {
            const index: number = flash_data.findIndex(d => d === item)
            console.log('++++++++++++++++++==')
            this.viewService.removeFlashSale(item.itemId)
          })
          swal('The flash sale has been removed!', {
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
          swal('Flash sale not removed')
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

  endFlashSale(): void {
    const dataArray = []
    // call to back-end with item_id
    this.selection.selected.forEach(item => {
      this.viewService.getEndFlashSale(item.itemId)
                      .subscribe(data => dataArray
                      )
    })
    // if total_weight - sale_weight > 0
    // call alert (in notepad)
  }
  warn(message: string): void {
    this.alertService.warn(message)
  }

}
