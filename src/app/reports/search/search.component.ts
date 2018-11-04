import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
// import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'
import swal from 'sweetalert'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'component-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup
  formSubmitAttempt: boolean

  constructor(
    private dialogRef: MatDialogRef<SearchComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      upc: [''],
      sku: [''],
      item_id: [''],
      name: [''],
      origin: [''],
      date_arrived: [''],
      total_weight: [''],
      price: [''],
      device_id: [''],
      lot: [''],
      start_date: [''],
      end_date: ['']
    })
  }

  onSubmit(): void {
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
    // this.form.value.date_arrived = Math.floor(Date.parse(`${origDate.year}/${month[origDate.month]}/${origDate.day}`) / 1000)
    this.form.value.date_arrived = Math.floor((new Date(origDate).getTime() / 1000))
    console.log(this.form.value.date_arrived)
    // this.addData.addProd(this.form.value)
    this.reset()
    this.close(searchData)
  }

  reset(): void {
    this.form.reset()
    this.formSubmitAttempt = false
  }

  close(data): void {
    this.dialogRef.close(data)
  }
}
