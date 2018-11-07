import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { HttpClient } from '@angular/common/http'
import swal from 'sweetalert'

@Component({
  selector: 'component-add-dialog-data-dialog',
  styleUrls: ['./add-dialog-data.css'],
  templateUrl: 'add-dialog-data-dialog.html'
})
export class AddDialogDataComponent implements OnInit {
  @ViewChild('date') dateSel: ElementRef
  form: FormGroup
  formSubmitAttempt: boolean
  curField: any
  returnUrl: string
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  dataSource = new MatTableDataSource()
  selection = new SelectionModel<Warning>(true, [])
  displayedColumns = ['select', 'sku', 'name', 'qty. unsold', 'status', 'projected expiry']

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getJSON()
      .subscribe(data => {
        console.log(data)
        // console.log(JSON.parse(data._body))
        const json = data
        this.dataSource.data = json
      })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  public getJSON(): any {

    return this.http.get('./static/mock_flash.json')
  }

  isFieldValid(field: string): any {
    return this.formSubmitAttempt && this.form.controls[field].status === 'INVALID'
  }

  f(): any { return this.form.controls }

  onSubmit(): void {
    this.formSubmitAttempt = true
    if (this.form.valid) {
      const month = new Array()
      month[0] = 'January'
      month[1] = 'February'
      month[2] = 'March'
      month[3] = 'April'
      month[4] = 'May'
      month[5] = 'June'
      month[6] = 'July'
      month[7] = 'August'
      month[8] = 'September'
      month[9] = 'October'
      month[10] = 'November'
      month[11] = 'December'
      this.formSubmitAttempt = true
      const origDate = this.form.value.projected_expiry
      this.form.value.projected_expiry = Math.floor(Date.parse(`${origDate.year}/${month[origDate.month]}/${origDate.day}`) / 1000)
      console.log('submitted')
      // this.loadInv.updateRow(this.form.value)
      swal('Record successfully inserted!')
        .then(log => {
          console.log(log)

          return true
        })
        .catch(err => {
          console.log(err)

          return false
        })
    }
  }
}
