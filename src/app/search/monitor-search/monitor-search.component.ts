import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
// import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'
import swal from 'sweetalert'
import { HttpClient } from '@angular/common/http'
import { MonitorSearchService } from './monitor-search.service'

interface Query {
  sku: string
  name: string
  lot: string
  start_date: number
  end_date: number
  exact_match: boolean
}

const searchData: Query[] = []

@Component({
  selector: 'component-monitor-search',
  templateUrl: './monitor-search.component.html',
  styleUrls: ['./monitor-search.component.css']
})
export class MonitorSearchComponent implements OnInit {

  form: FormGroup
  formSubmitAttempt: boolean
  checked = false
  dateNotValid = false
  periodNotValid = false
  message: string

  constructor(
    private dialogRef: MatDialogRef<MonitorSearchComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private searchService: MonitorSearchService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sku: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lot: ['', [Validators.required]],
      start_date: [''],
      end_date: [''],
      period: [''],
      exact_match: ['']
    })
  }

  checkDates(): boolean {
    if ((this.form.value.start_date !== '' && this.form.value.end_date !== '') && this.form.value.period === '') {
      console.log('heretrue')

      return true
    }
    if (this.form.value.period !== '' && (this.form.value.start_date === '' && this.form.value.end_date === '')) {
      console.log('herefalse')

      return false
    }
  }

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

      const today = new Date().getTime() / 1000
      let startDate = this.form.value.start_date
      let endDate = this.form.value.end_date

      if (this.form.value.exact_match === '') {
        this.form.value.exact_match = false
      }

      if (startDate) {
        this.form.value.start_date = Math.floor((new Date(startDate).getTime() / 1000))
        startDate = this.form.value.start_date
      }

      if (endDate) {
        this.form.value.end_date = Math.floor((new Date(endDate).getTime() / 1000))
        endDate = this.form.value.end_date
      }

      if ((startDate && endDate) && (startDate > endDate)) {
        console.log(startDate)
        console.log(endDate)
        this.dateNotValid = true
        this.message = 'Start date cannot be greater than end date'
      }

      if ((startDate && endDate) && (endDate > today)) {
        this.dateNotValid = true
        this.message = 'End date cannot be greater than today'
      }

      else {
        this.dateNotValid = false
      }

      if (startDate && endDate === '') {
        this.dateNotValid = true
        this.message = 'End date is required'
      }

      if (endDate && this.form.value.period && !startDate) {
        this.form.value.start_date = endDate - this.switchTime(this.form.value.period)
      }

      const object = this.form.value

      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          searchData[property] = object[property]
        }
      }

      console.log(searchData)

      if (!this.dateNotValid && !this.periodNotValid) {
        // searchService
        this.reset()
        this.close(this.searchService.search(searchData))
      }
    }
  }

  switchTime(period: string): number {
    let periodNum = 0
    switch (period) {
      case 'week': {
        periodNum = 604800
        break
      }
      case 'mon': {
        periodNum = 2629743
        break
      }
      case '3mons': {
        periodNum = 2629743 * 3
        break
      }
      case '6mons': {
        periodNum = 2629743 * 6
        break
      }
      case 'year': {
        periodNum = 31556926
        break
      }
      default: {
        break
      }
    }

    return periodNum
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
