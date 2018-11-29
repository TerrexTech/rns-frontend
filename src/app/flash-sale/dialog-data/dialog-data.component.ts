import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import swal from 'sweetalert'
import { UpdateFlashSaleService } from './dialog-data.service'
import { FlashSaleService } from '../flashsale.service'

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
  private route: ActivatedRoute,
  private router: Router,
  private updateServ: FlashSaleService
             ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      itemID: [],
      sku: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      lot: ['', [Validators.required, Validators.minLength(1)]],
      soldWeight: ['', [Validators.required, Validators.minLength(1)]],
      totalWeight: ['', [Validators.required, Validators.minLength(1)]],
      timestamp: ['', [Validators.required, Validators.minLength(1)]]
    })
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
    this.curField = this.data
    this.form.get('sku')
             .setValue(this.curField.data.sku)
    this.form.get('name')
             .setValue(this.curField.data.name)
    this.form.get('lot')
             .setValue(this.curField.data.lot)
    this.form.get('soldWeight')
             .setValue(this.curField.data.soldWeight)
    this.form.get('totalWeight')
             .setValue(this.curField.data.totalWeight)
    this.form.get('timestamp')
             .setValue(this.curField.data.timestamp)
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
    this.form.value.itemID = this.curField.data.itemID
    console.log(this.form.value.itemID)
    const origDate = this.form.value.timestamp
    this.form.value.timestamp = Math.floor(Date.parse(`${origDate.year}/${month[origDate.month]}/${origDate.day}`) / 1000)
    this.updateServ.editFlashSale(this.form.value)
                   .toPromise()
                   .then((data: any) => {
                     console.log(data)
                     if (data.data.FlashsaleUpdate) {
                       console.log(data.data.FlashsaleUpdate)
                       swal('Record successfully inserted!')
                            .catch(err => console.log(err))
                     }
                   })
                   .catch(async () => swal('Record not updated!')
                                          .catch(err => console.log(err))
                   )
  }
}
}
