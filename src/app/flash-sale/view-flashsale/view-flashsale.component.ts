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

let flash_data: any[] = []
@Component({
  selector: 'component-view-flashsale',
  templateUrl: './view-flashsale.component.html',
  styleUrls: ['./view-flashsale.component.css']
})
export class ViewFlashsaleComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: Http, private invServ: InventoryService,
              private alertService: AlertService, private navServ: NavbarService) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<FlashSale>(true, [])

  displayedColumns = ['select', 'sku', 'name', 'lot', 'soldWeight', 'totalWeight', 'remainingWeight', 'status']
  curField: any

  ngOnInit(): void {
    this.navServ.newEvent(0)

    if (JSON.parse(localStorage.getItem('flashSale'))) {
      const arr2 = JSON.parse(localStorage.getItem('flashSale'))
      this.dataSource.data = arr2
      flash_data = arr2
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      this.dataSource.data.forEach(element => {
        element['soldWeight'] = Math.round(element['soldWeight'])
                                    .toFixed(2)
        element['totalWeight'] = Math.round(element['totalWeight'])
                                    .toFixed(2)
        element['remainingWeight'] = Math.round(element['remainingWeight'])
                                        .toFixed(2)
      })
    }
    else {
      swal('No Flash Sales present')
          .catch(err => console.log(err))
    }
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
        else {
          swal('No Flash Sales.')
              .catch(err => console.log(err))
        }
      })
    this.dataSource.data = flash_data
  }

  addNewFlashSale(): void {
    this.selection.selected.forEach(item => {
    const index: number = flash_data.findIndex(d => d === item)
    this.curField = item
    console.log(this.curField)
    })
    if (this.curField) {
    this.dialog.open(AddDialogDataComponent, {
      data: this.curField
    })
  }
  else {
    alert('Please select a row(s)')
  }
  }

  newSale(): void {
    this.selection.selected.forEach(item => {
      this.curField = flash_data.filter(i => i.itemID === item.itemID)[0]
      console.log(this.curField)
      console.log('++++++++++++++++++==')
    })
    this.dataSource.data.forEach(element => {
      element['soldWeight'] *= 2
    })

    // this.viewService.newFlashSale(this.curField)
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
      buttons: ['No', 'Yes'],
      dangerMode: true
    })
      .then(willDelete => {
        if (willDelete) {
          const flashSales = JSON.parse(localStorage.getItem('flashSale'))
          const itemIDs = this.selection.selected.map(i => i.itemID)
          console.log(itemIDs)
          itemIDs.forEach(element => {
            console.log(element)
            this.invServ.deleteRows(element)
                        .toPromise()
                        .then((data: any) => {
                          console.log(data.data.InventoryDelete)
                        })
                        .catch(async () => swal('data not deleted'))
                                          .catch(() => console.log('popup failed'))

          })

          this.dataSource.data = flashSales.filter(fs => itemIDs.indexOf(fs.itemID) === -1)
          localStorage.setItem('flashSale', JSON.stringify(this.dataSource.data))
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
    // if total_weight - sale_weight > 0
    // call alert (in notepad)
}
