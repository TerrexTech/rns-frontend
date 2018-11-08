import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
// import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'
import swal from 'sweetalert'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'component-monitor-search',
  templateUrl: './monitor-search.component.html',
  styleUrls: ['./monitor-search.component.css']
})
export class MonitorSearchComponent implements OnInit {

  form: FormGroup
  formSubmitAttempt: boolean
  checked = false

  constructor(
    private dialogRef: MatDialogRef<MonitorSearchComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      lot: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      period: [''],
      exact_match: ['']
    })
  }

  checkDates(): boolean {
    if (this.form.value.start_date !== '' && this.form.value.end_date !== '') {
      console.log('heretrue')

      return true
    }
    else if (this.form.value.period !== '') {
      console.log('herefalse')

      return false
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
    this.formSubmitAttempt = true
    const searchData = []
    const object = this.form.value

    for (const property in object) {
      if (object.hasOwnProperty(property)) {
        searchData[property] = object[property]
      }
    }

    console.log(searchData)

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
    const origDate = this.form.value.date_arrived
    console.log(origDate)
    this.form.value.date_arrived = Math.floor((new Date(origDate).getTime() / 1000))
    console.log(this.form.value.date_arrived)
    // searchService
    // this.addData.addProd(this.form.value)
    this.reset()
    this.close(searchData)
  }
  }

  reset(): void {
    this.form.reset()
    this.formSubmitAttempt = false
  }

  close(data): void {
    this.dialogRef.close(data)
  }

  isFieldValid(field: string): any {
    return this.formSubmitAttempt && this.form.controls[field].status === 'INVALID'
  }

}
