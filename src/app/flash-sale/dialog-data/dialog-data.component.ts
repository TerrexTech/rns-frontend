import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'
import swal from 'sweetalert'

@Component({
  selector: 'component-dialog-data-dialog',
  templateUrl: 'dialog-data-dialog.html'
})
export class DialogDataDialogComponent implements OnInit {
  @ViewChild('date') dateSel: ElementRef
  form: FormGroup
  formSubmitAttempt: boolean
  curField: any
  returnUrl: string

  constructor(
  private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private loadInv: LoadInventoryJsonService,
  private route: ActivatedRoute,
  private router: Router
             ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      upc: ['', [Validators.required, Validators.minLength(1)]],
      sku: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      origin: ['', [Validators.required, Validators.minLength(1)]],
      device_id: ['', [Validators.required, Validators.minLength(1)]],
      timestamp: ['', [Validators.required, Validators.minLength(1)]],
      ethylene: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required, Validators.minLength(1)]],
      sale_price: ['', [Validators.required, Validators.minLength(1)]],
      status: ['', [Validators.required, Validators.minLength(1)]]
    })
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
    this.curField = this.data
    this.form.get('upc')
             .setValue(this.curField.data.upc)
    this.form.get('sku')
             .setValue(this.curField.data.sku)
    this.form.get('name')
             .setValue(this.curField.data.name)
    this.form.get('origin')
             .setValue(this.curField.data.origin)
    this.form.get('device_id')
             .setValue(this.curField.data.device_id)
    this.form.get('timestamp')
             .setValue(this.curField.data.timestamp)
    this.form.get('ethylene')
             .setValue(this.curField.data.ethylene)
    this.form.get('price')
             .setValue(this.curField.data.price)
    this.form.get('sale_price')
             .setValue(this.curField.data.sale_price)
    this.form.get('status')
             .setValue(this.curField.data.status)
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
    const origDate = this.form.value.timestamp
    this.form.value.timestamp = Math.floor(Date.parse(`${origDate.year}/${month[origDate.month]}/${origDate.day}`) / 1000)
    console.log('submitted')
    this.loadInv.updateRow(this.form.value)
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
