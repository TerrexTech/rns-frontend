import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { NavbarService } from '../../shared/navbar/navbar.service'

let donatedItems: any[] = []

@Component({
  selector: 'component-donate-food',
  templateUrl: './donate-food.component.html',
  styleUrls: ['./donate-food.component.css']
})
export class DonateFoodComponent implements OnInit {

  constructor(
              public dialog: MatDialog,
              private navServ: NavbarService
             ) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selectedItems = new SelectionModel<Warning>(true, [])

  displayedColumns = ['sku', 'name', 'qty_unsold', 'projectedExpiry']
  curField: any

  ngOnInit(): void {
    this.navServ.newEvent(0)
    const localDoantion = JSON.parse(localStorage.getItem('donation'))
    this.dataSource.data = localDoantion
    donatedItems = localDoantion
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
        data: [this.curField, 'Donate']
      }
    })
  }
}
