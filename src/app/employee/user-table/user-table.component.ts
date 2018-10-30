import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { Employee } from '../../models/employee'
import { SelectionModel } from '@angular/cdk/collections'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import swal from 'sweetalert'

const Employees: any[] = []

@Component({
  selector: 'component-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @ViewChild(MatSort) sort: MatSort
  selection = new SelectionModel<Employee>(true, [])

  displayedColumns = ['select', 'first_name', 'last_name', 'username', 'email', 'role', 'modify']
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
  dataSource = new MatTableDataSource(this.ELEMENT_DATA)
  curField: any
  populateFields(e): Employee {
    console.log(e)
    if (e !== undefined) {
      this.curField = this.ELEMENT_DATA.filter(i => i.email === e)[0]
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
      text: 'Once deleted, this employee will be deleted.',
      icon: 'warning',
      buttons: ['Yes', 'No'],
      dangerMode: true
    })
      .then(willDelete => {
        if (!willDelete) {
          this.selection.selected.forEach(item => {
            const index: number = Employees.findIndex(d => d === item)
            console.log('++++++++++++++++++==')
            // this.loadInventoryJsonService.deleteRow(item.item_id)
          })
          swal('Poof! The following employee has been deleted!', {
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
          swal('Employee not removed')
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

  ngOnInit(): void {
    this.dataSource.sort = this.sort
  }
}
