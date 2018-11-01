import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import swal from 'sweetalert'

@Component({
  selector: 'component-add-dialog-data-dialog',
  templateUrl: 'add-dialog-data-dialog.html'
})
export class AddDialogDataComponent implements OnInit {
  @ViewChild('date') dateSel: ElementRef
  form: FormGroup
  formSubmitAttempt: boolean
  curField: any
  returnUrl: string

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sku: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      leftover_waste: ['', [Validators.required, Validators.minLength(1)]],
      status: ['', [Validators.required, Validators.minLength(1)]],
      projected_expiry: ['', [Validators.required, Validators.minLength(1)]]
    })
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
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
