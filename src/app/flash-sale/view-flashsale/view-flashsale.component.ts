import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { Employee } from '../../models/employee'
import { SelectionModel } from '@angular/cdk/collections'
import swal from 'sweetalert'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { AddDialogDataComponent } from '../add-dialog-data/add-dialog-data.component'
import { FlashSale } from '../../models/flash-sale'
import { Http } from '@angular/http'
import { AlertService } from '../../alert-popup/alert.service'
import { TableSearchComponent } from '../../search/table-search/table-search.component'
import { NavbarService } from '../../shared/navbar/navbar.service'
import { InventoryService } from '../../inventory/inventory.service'
import { FlashSaleService } from '../flashsale.service'

let flash_data: any[] = []
@Component({
  selector: 'component-view-flashsale',
  templateUrl: './view-flashsale.component.html',
  styleUrls: ['./view-flashsale.component.css']
})
export class ViewFlashsaleComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private http: Http,
              private invServ: InventoryService,
              private flashServ: FlashSaleService,
              private navServ: NavbarService) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<FlashSale>(true, [])

  displayedColumns = ['select', 'sku', 'name', 'lot', 'soldWeight', 'totalWeight', 'remainingWeight', 'status', 'timestamp']
  curField: any
  statusMessage: string

  ngOnInit(): void {
    this.navServ.newEvent(0)

    this.flashServ.getFlashSales()
                  .toPromise()
                  .then((data: any) => {
                    console.log(data)
                    console.log(data.data.FlashsaleQueryCount)

                    const oneday = 86400
                    const twoday = oneday * 2
                    const threeday = oneday * 3
                    const today = new Date().getTime() / 1000
                    this.dataSource.data = data.data.FlashsaleQueryCount
                    flash_data = data.data.FlashsaleQueryCount
                    this.dataSource.paginator = this.paginator
                    this.dataSource.data.forEach(element => {
                      element['soldWeight'] = Math.round(element['soldWeight'])
                                                  .toFixed(2)
                      element['totalWeight'] = Math.round(element['totalWeight'])
                                                  .toFixed(2)
                      element['remainingWeight'] = Math.round(element['remainingWeight'])
                                                      .toFixed(2)

                      if (element['timestamp'] - today <= threeday) {
                        element['status'] = 'bad'
                        this.statusMessage = 'Expiring soon'
                        element['projectedExpiry'] = element['projectedDate']
                      }

                      else if (element['timestamp'] - today <= oneday) {
                          element['status'] = 'bad'
                          this.statusMessage = 'Act now'
                          element['projectedExpiry'] = element['projectedDate']
                        }

                      const sorting: MatSortable = {
                          id: 'timestamp',
                          start: 'asc',
                          disableClear: false
                      }
                      this.sort.sort(sorting)
                      this.dataSource.sort = this.sort
                    })
                  })
                  .catch(async () => swal('No Flash sales')
                                  .catch(err => console.log(err))
                  )
  }

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px'
    })
      .afterClosed()
      .subscribe(data => {
        if (data) {
        flash_data = data
        }
        // else {
        //   swal('No Results.')
        //       .catch(err => console.log(err))
        // }
      })
  }

  addNewFlashSale(): void {
    this.dialog.open(TableSearchComponent)
    .afterClosed()
      .subscribe(searchData => {
        if (searchData) {
          this.dialog.open(AddDialogDataComponent, {
            data: searchData,
            minWidth: 800,
            minHeight: 600
          })
        }
      })
  }

  selected(): boolean {
    return this.selection.selected.length >= 2
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
        this.curField = item
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
  }

 async removeSelectedRows(): Promise<any> {

    const willDelete = await swal({
      title: 'Are you sure?',
      text: 'Selling Item(s)?',
      icon: 'success',
      buttons: ['Yes', 'No'],
      closeOnClickOutside: false,
      closeOnEsc: false,
      dangerMode: true
    })
    if (!willDelete) {
      const selectedItems = this.selection.selected.map(item => item)
      console.log(selectedItems)

      for (const item of selectedItems) {
        try {
          console.log(item)
          item.onFlashsale = false
          console.log(item)
          const endResult = await this.flashServ.editFlashSale(item)
            .toPromise()
        }
        catch (e) {
          swal('Item not sold')
            .catch(console.log)
        }
      }
      this.showUnsold()
      swal('the selected item(s) have been sold!', {
        icon: 'success'
      })
        .catch(console.log)
    }
  }

  showUnsold(): void {
    this.flashServ.getFlashSales()
        .toPromise()
        .then((data: any) => {
          console.log(data)
          console.log(data.data.FlashsaleQueryCount)
          this.dataSource.data = data.data.FlashsaleQueryCount.filter(item => item.onFlashsale)
          console.log(this.dataSource.data)
          const sorting: MatSortable = {
            id: 'timestamp',
            start: 'asc',
            disableClear: false
        }
          this.sort.sort(sorting)
          this.dataSource.sort = this.sort
        })
        .catch(async () => swal('No Flash sales')
                        .catch(err => console.log(err)))
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
    // if total_weight - sale_weight > 0
    // call alert (in notepad)
}
