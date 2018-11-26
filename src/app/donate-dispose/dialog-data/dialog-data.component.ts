import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import swal from 'sweetalert'

@Component({
  selector: 'component-dialog-data-dialog',
  templateUrl: 'dialog-data-dialog.html'
})
export class DialogDataDialogComponent implements OnInit {
  form: FormGroup
  formSubmitAttempt: boolean
  curField: any
  pageType: string
  returnUrl: string

  constructor(
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public dataRecieved: any,
              private route: ActivatedRoute
             ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sku: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      leftover_amount: ['', [Validators.required, Validators.minLength(1)]],
      timestamp: ['', [Validators.required, Validators.minLength(1)]],
      status: ['', [Validators.required, Validators.minLength(1)]]
    })
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
    this.curField = this.dataRecieved.data[0]
    this.pageType = this.dataRecieved.data[1]

    this.form.get('sku')
             .setValue(this.curField.sku)
    this.form.get('name')
             .setValue(this.curField.name)
    this.form.get('leftover_amount')
             .setValue(this.curField.leftover_amount)
    this.form.get('timestamp')
             .setValue(this.curField.timestamp)
    this.form.get('status')
             .setValue(this.curField.status)
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
    swal('Record successfully inserted!')
      .catch(err => {
        console.log(err)
      })
  }
  else {
    swal('Record not inserted!')
      .catch(err => {
        console.log(err)
      })
  }
}
}
