import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
// import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'
import swal from 'sweetalert'
import { HttpClient } from '@angular/common/http'
import { TableSearchService } from './table-search.service'

interface Query {
  upc: string
  sku: string
  name: string
  origin: string
  price: string
  lot: string
  start_date: number
  end_date: number
  exact_match: boolean
}

const searchData: Query[] = []

@Component({
  selector: 'component-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})

export class TableSearchComponent implements OnInit {

  form: FormGroup
  formSubmitAttempt: boolean
  checked = false
  dateNotValid = false
  periodNotValid = false
  message: string

  constructor(
    private dialogRef: MatDialogRef<TableSearchComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private searchService: TableSearchService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      origin: [''],
      price: [''],
      lot: ['', Validators.required],
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
    let period = 0

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

    if (startDate && endDate && startDate > endDate) {
      this.dateNotValid = true
      this.message = 'Start date cannot be greater than end date'
    }

    else {
      this.dateNotValid = false
    }

    if (startDate > today || endDate > today) {
      this.periodNotValid = true
      this.message = 'Selected date cannot be greater than current day'
    }

    else {
      this.periodNotValid = false
    }

    if (endDate) {
    switch (this.form.value.period) {
      case 'week': {
        period = 604800
        this.form.value.start_date = endDate - period
        break
      }
      case 'mon': {
        period = 2629743
        this.form.value.start_date = endDate - period
        break
      }
      case '3mons': {
        period = 2629743 * 3
        this.form.value.start_date = endDate - period
        break
      }
      case '6mons': {
        period = 2629743 * 6
        this.form.value.start_date = endDate - period
        break
      }
      case 'year': {
        period = 31556926
        this.form.value.start_date = endDate - period
        break
      }
      default: {
        break
      }
    }
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

  reset(): void {
    this.form.reset()
    this.formSubmitAttempt = false
  }

  close(data): void {
    this.dialogRef.close(data)
  }

}
