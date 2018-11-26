import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { Employee } from '../../models/employee'
import { SelectionModel } from '@angular/cdk/collections'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { UserTableService } from './user-table.service'
import swal from 'sweetalert'

const Employees: any[] = []

@Component({
  selector: 'component-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  constructor(public dialog: MatDialog, public userServ: UserTableService) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  selection = new SelectionModel<Employee>(true, [])

  displayedColumns = ['select', 'first_name', 'last_name', 'username', 'email', 'role']
  ELEMENT_DATA: Employee[] = [
    {
      first_name: 'Danny', last_name: 'Santhos', username: 'dsanthos', password: 'test', email: 'dsanthos@gmail.com', role: 'Corporate'
    },
    {
      first_name: 'Bob', last_name: 'Santhos', username: 'bsanthos', password: 'test', email: 'bsanthos@gmail.com', role: 'Corporate'
    },
    {
      first_name: 'Manny', last_name: 'Santhos', username: 'msanthos', password: 'test', email: 'msanthos@gmail.com', role: 'Corporate'
    },
    {
      first_name: 'Nanny', last_name: 'Santhos', username: 'nsanthos', password: 'test', email: 'nsanthos@gmail.com', role: 'Corporate'
    },
    {
      first_name: 'Tammy', last_name: 'Santhos', username: 'tsanthos', password: 'test', email: 'tsanthos@gmail.com', role: 'Corporate'
    },
    {
      first_name: 'Nando', last_name: 'Santhos', username: 'nsanthos', password: 'test', email: 'nsanthos@gmail.com', role: 'Corporate'
    }
  ]
  dataSource = new MatTableDataSource()
  curField: any

  ngOnInit(): void {
    this.dataSource.data = this.ELEMENT_DATA
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  selected(): boolean {
    console.log(this.selection.selected.length)
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
      this.curField = Employees.filter(i => i.email === item.email)[0]
      console.log(this.curField)
      console.log('++++++++++++++++++==')
    })
    this.dialog.open(DialogDataDialogComponent, {
      data: {
        data: this.curField
      }
    })
    console.log()
  }

  removeSelectedRows(): void {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, this employee will be deleted.',
      icon: 'warning',
      buttons: ['Yes', 'No'],
      dangerMode: true,
      closeOnClickOutside: false
    })
      .then(willDelete => {
        if (!willDelete) {
          this.selection.selected.forEach(item => {
            const index: number = Employees.findIndex(d => d === item)
            console.log('++++++++++++++++++==')
            this.userServ.deleteRows(item.email)
          })
          swal('The following employee has been deleted!', {
            icon: 'success'
          })
          .catch(err => {
            console.log(err)
          })
        }
      })
      .catch(() => {
        swal('Employee not deleted.')
          .catch(err => {
        console.log(err)
          })
      })
  }
}
