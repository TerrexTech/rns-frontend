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
      item_id: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      origin: ['', [Validators.required, Validators.minLength(1)]],
      date_arrived: ['', [Validators.required, Validators.minLength(1)]],
      total_weight: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required, Validators.minLength(1)]],
      device_id: ['', [Validators.required, Validators.minLength(1)]],
      location: ['', [Validators.required, Validators.minLength(1)]]
    })
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
    this.curField = this.data
    this.form.get('upc')
             .setValue(this.curField.data.upc)
    this.form.get('sku')
             .setValue(this.curField.data.sku)
    this.form.get('item_id')
             .setValue(this.curField.data.item_id)
    this.form.get('name')
             .setValue(this.curField.data.name)
    this.form.get('origin')
             .setValue(this.curField.data.origin)
    // this.form.get('date_arrived').setValue(new Date(this.curField.data.date_arrived * 1000).toJSON().split('T')[0])
    // this.dateSel.nativeElement.value = new Date(this.curField.data.date_arrived * 1000).toJSON().split('T')[0]
    this.form.get('total_weight')
             .setValue(this.curField.data.total_weight)
    this.form.get('price')
             .setValue(this.curField.data.price)
    this.form.get('device_id')
             .setValue(this.curField.data.device_id)
    this.form.get('location')
             .setValue(this.curField.data.location)
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
    const origDate = this.form.value.date_arrived
    this.form.value.date_arrived = Math.floor(Date.parse(`${origDate.year}/${month[origDate.month]}/${origDate.day}`) / 1000)
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
