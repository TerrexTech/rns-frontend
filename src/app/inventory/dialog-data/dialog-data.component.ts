import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import swal from 'sweetalert'
import { InventoryService } from '../inventory.service'

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
  private updateInv: InventoryService,
  private dialogRef: MatDialogRef<DialogDataDialogComponent>
             ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      upc: ['', [Validators.required, Validators.minLength(1)]],
      sku: ['', [Validators.required, Validators.minLength(1)]],
      itemID: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      origin: ['', [Validators.required, Validators.minLength(1)]],
      dateArrived: ['', [Validators.required, Validators.minLength(1)]],
      totalWeight: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required, Validators.minLength(1)]],
      deviceID: ['', [Validators.required, Validators.minLength(1)]],
      lot: ['', [Validators.required, Validators.minLength(1)]]
    })
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
    this.curField = this.data
    this.form.get('upc')
             .setValue(this.curField.data.upc)
    this.form.get('sku')
             .setValue(this.curField.data.sku)
    this.form.get('itemID')
             .setValue(this.curField.data.itemID)
    this.form.get('name')
             .setValue(this.curField.data.name)
    this.form.get('dateArrived')
             .setValue(new Date(this.curField.data.dateArrived)
             .toLocaleDateString()
             .split('T')[0])
    this.form.get('origin')
             .setValue(this.curField.data.origin)
    this.form.get('totalWeight')
             .setValue(this.curField.data.totalWeight)
    this.form.get('price')
             .setValue(this.curField.data.price)
    this.form.get('deviceID')
             .setValue(this.curField.data.deviceID)
    this.form.get('lot')
             .setValue(this.curField.data.lot)
  }

  isFieldValid(field: string): any {
    return this.formSubmitAttempt && this.form.controls[field].status === 'INVALID'
  }

  f(): any { return this.form.controls }

  onSubmit(): void {
    console.log(this.data)
    console.log(this.form.value)

    for (const item in this.form.value) {
      if (!item) {
        swal('Missing Field(s)!')
            .catch(console.log)
        this.dialogRef.close()
      }
    }

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
    const origDate = this.form.value.dateArrived
    this.form.value.dateArrived = Math.floor(Date.parse(origDate))
    console.log('submitted')
    this.updateInv.updateItem(this.form.value)
                  .toPromise()
                  .then((data: any) => {
                    console.log(data)
                    if (data.data) {
                      this.reset()
                      }
                    else {
                      alert('Row not updated')
                    }
                    }

                    )
                    .catch()

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

  reset(): void {
    this.form.reset()
    this.formSubmitAttempt = false
  }
}
