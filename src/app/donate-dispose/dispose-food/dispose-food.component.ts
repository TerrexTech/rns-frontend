import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { NavbarService } from '../../shared/navbar/navbar.service'

let disposedItems: any[] = []

@Component({
  selector: 'component-dispose-food',
  templateUrl: './dispose-food.component.html',
  styleUrls: ['./dispose-food.component.css']
})
export class DisposeFoodComponent implements OnInit {

  constructor(
              public dialog: MatDialog,
              private navServ: NavbarService
             ) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selectedItems = new SelectionModel<Warning>(true, [])

  displayedColumns = ['sku', 'name', 'qty_unsold', 'status', 'projectedExpiry']
  curField: any

  ngOnInit(): void {
    this.navServ.newEvent(0)
    const localDisposal = JSON.parse(localStorage.getItem('disposal'))
    this.dataSource.data = localDisposal
    disposedItems = localDisposal
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.dataSource.data.forEach(element => {
      element['qty_unsold'] = Math.round(element['qty_unsold'])
                                  .toFixed(2)
    })
  }

  populateFields(): void {
    this.selectedItems.selected.forEach(item => {
      console.log(item)
      this.curField = item
      console.log(this.curField)
    })
    this.dialog.open(DialogDataDialogComponent, {
      data: {
        data: [this.curField, 'Dispose']
      }
    })
  }

}
