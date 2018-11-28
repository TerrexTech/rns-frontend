import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { Http } from '@angular/http'
import swal from 'sweetalert'
import { DialogDataService } from './dialog-data.service'
import { InventoryService } from '../../inventory/inventory.service'
import { WarningService } from '../warning.service'

@Component({
  selector: 'component-dialog-data-dialog',
  templateUrl: 'dialog-data-dialog.html',
  styleUrls: ['./dialog-data.component.css']

})
export class DialogDataDialogComponent implements OnInit {
  @ViewChild('date') dateSel: ElementRef
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  form: FormGroup
  formSubmitAttempt: boolean
  curField: any
  returnUrl: string
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<Warning>(true, [])
  displayedColumns = ['sku', 'name', 'qty. unsold', 'status', 'projectedExpiry']

  constructor(
  private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private route: ActivatedRoute,
  private router: Router,
  private dialogService: DialogDataService,
  private invServ: InventoryService,
  private warnServ: WarningService
             ) { }

  ngOnInit(): void {
    console.log(this.data.data)
    this.dataSource.data = this.data.data[0]
    this.dataSource.data.forEach(element => {
      // element['status'] = 'Expiring soon'
    })

    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  onSubmit(): void {

    if (this.data.data[1] === 'Flash Sale') {
      let array1 = JSON.parse(localStorage.getItem('flashSale')) || []
      array1 = array1.concat(...this.data.data[0])
      localStorage.setItem('flashSale', JSON.stringify(array1))

      const warningArray = JSON.parse(localStorage.getItem('warning'))
      const flashArray = JSON.parse(localStorage.getItem('flashSale'))

      const flashSales = this.data.data[0].map(f => f)
      const newWarnings = warningArray.filter(w => flashSales.indexOf(w.itemID) === -1)
      flashSales.forEach(element => {
        element.onFlashsale = true
        console.log(element.itemID)

        this.warnServ.newFlashSale(element)
                    .toPromise()
                    .then((data: any) => {
                      if (data) {
                        console.log(data)
                        console.log(data.data.FlashsaleInsert)
                      }
                    })
                    .catch(async () => swal('warning not inserted'))
                                      .catch(() => console.log('popup failed'))

        this.warnServ.deleteWarning(element.itemID)
                    .toPromise()
                    .then((data: any) => {
                      console.log(data.data.WarningDelete)
                    })
                    .catch(async () => swal('data not deleted'))
                                      .catch(() => console.log('popup failed'))

      })

      // localStorage.setItem('warning', JSON.stringify(newWarnings))
    }

    else if (this.data.data[1] === 'Donation') {
      let array1 = JSON.parse(localStorage.getItem('donation')) || []
      array1 = array1.concat(...this.data.data[0])
      localStorage.setItem('donation', JSON.stringify(array1))

      const warningArray = JSON.parse(localStorage.getItem('warning'))
      const flashArray = JSON.parse(localStorage.getItem('donation'))

      const flashSaleIds = flashArray.map(f => f.itemID)

      flashSaleIds.forEach(element => {
        console.log(element)
        this.invServ.deleteRows(element)
                    .toPromise()
                    .then((data: any) => {
                      console.log(data.data.InventoryDelete)
                    })
                    .catch(async () => swal('data not deleted'))
                                      .catch(() => console.log('popup failed'))

      })

      const newWarnings = warningArray.filter(w => flashSaleIds.indexOf(w.itemID) === -1)
      localStorage.setItem('warning', JSON.stringify(newWarnings))
      console.log(localStorage.getItem('warning'))
    }

    else if (this.data.data[1] === 'Disposal') {
      let array1 = JSON.parse(localStorage.getItem('disposal')) || []
      array1 = array1.concat(...this.data.data[0])
      localStorage.setItem('disposal', JSON.stringify(array1))

      const warningArray = JSON.parse(localStorage.getItem('warning'))
      const flashArray = JSON.parse(localStorage.getItem('disposal'))

      const flashSaleIds = flashArray.map(f => f.itemID)

      flashSaleIds.forEach(element => {
        console.log(element)
        this.invServ.deleteRows(element)
                    .toPromise()
                    .then((data: any) => {
                      console.log(data.data.InventoryDelete)
                    })
                    .catch(async () => swal('data not deleted'))
                                      .catch(() => console.log('popup failed'))

      })

      const newWarnings = warningArray.filter(w => flashSaleIds.indexOf(w.itemID) === -1)
      console.log(newWarnings)
      localStorage.setItem('warning', JSON.stringify(newWarnings))
    }
    this.router.navigate([this.data.data[2]])
               .catch(console.log)
  }
}
