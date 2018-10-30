import { AddInventoryService } from './add.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import swal from 'sweetalert'
import { MockUtils } from './mockutils'
import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'

@Component({
  selector: 'component-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [AddInventoryService]
})
export class AddComponent implements OnInit {
  form: FormGroup
  formSubmitAttempt: boolean

  constructor(
    private formBuilder: FormBuilder,
    private addService: AddInventoryService,
    private addData: LoadInventoryJsonService
  ) {}

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
      lot: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  generate(): void {
    const m = new MockUtils()

    this.form.get('sku')
      .setValue(m.genSKU())
    this.form.get('upc')
      .setValue(m.genBarcode())
    this.form.get('item_id')
      .setValue(m.genUUID())
    this.form.get('name')
      .setValue(m.genName())
    this.form.get('origin')
      .setValue(m.genOrigin())
    this.form.get('date_arrived')
      .setValue(new Date(m.genDateArrived())
      .toLocaleDateString()
      .split('T')[0])
    this.form.get('total_weight')
      .setValue(`m.genWeight()
                 .toFixed(2) + ' Kilograms'`)
    this.form.get('price')
      .setValue(`m.genPrice()
                 .toFixed(2) + ' Dollars'`)
    this.form.get('device_id')
      .setValue(m.genUUID())
    this.form.get('lot')
      .setValue(m.genLot())
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
      const origDate = this.form.value.date_arrived
      console.log(origDate)
      // this.form.value.date_arrived = Math.floor(Date.parse(`${origDate.year}/${month[origDate.month]}/${origDate.day}`) / 1000)
      this.form.value.date_arrived = Math.floor((new Date(origDate).getTime() / 1000))
      console.log(this.form.value.date_arrived)
      this.addData.addProd(this.form.value)
      this.reset()
    }
  }

  reset(): void {
    this.form.reset()
    this.formSubmitAttempt = false
  }

  isFieldValid(field: string): any {
    return this.formSubmitAttempt && this.form.controls[field].status === 'INVALID'
  }

}
