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
      const flashSales = this.data.data[0].map(f => f)
      flashSales.forEach(element => {
        element.onFlashsale = true
        console.log(element.itemID)

        this.warnServ.newFlashSale(element)
                    .toPromise()
                    .then((flashData: any) => {
                      if (flashData) {
                        console.log(flashData)
                        console.log(flashData.data.FlashsaleInsert)
                        this.warnServ.deleteWarning(element.itemID)
                                      .toPromise()
                                      .then((data: any) => {
                                        console.log(data.data.WarningDelete)
                                        this.router.navigate([this.data.data[2]])
                                                   .catch(console.log)
                                      })
                                      .catch(async () => swal('data not deleted'))
                                                        .catch(() => console.log('popup failed'))
                      }
                    })
                    .catch(async () => swal('Flash sale not inserted'))
                                      .catch(() => console.log('popup failed'))
      })
    }

    if (this.data.data[1] === 'Donation') {
      const donations = this.data.data[0].map(f => f)
      donations.forEach(element => {
        console.log(element.itemID)

        this.warnServ.newDonation(element)
                    .toPromise()
                    .then((donationData: any) => {
                      if (donationData) {
                        console.log(donationData)
                        console.log(donationData.data.DonationInsert)

                        this.warnServ.deleteWarning(element.itemID)
                                     .toPromise()
                                     .then((data: any) => {
                                        console.log(data.data.WarningDelete)
                                        this.router.navigate([this.data.data[2]])
                                                   .catch(console.log)
                                      })
                                     .catch(async () => swal('data not deleted'))
                                                        .catch(() => console.log('popup failed'))
                      }
                    })
                    .catch(async () => swal('Donation not inserted'))
                                      .catch(() => console.log('popup failed'))

      })
    }

    if (this.data.data[1] === 'Disposal') {
      const disposals = this.data.data[0].map(f => f)
      disposals.forEach(element => {
        console.log(element.itemID)

        this.warnServ.newDiposal(element)
                     .toPromise()
                     .then((disposeData: any) => {
                      if (disposeData) {
                        console.log(disposeData)
                        console.log(disposeData.data.DisposalInsert)
                        this.warnServ.deleteWarning(element.itemID)
                                      .toPromise()
                                      .then((data: any) => {
                                        console.log(data.data.WarningDelete)
                                        this.router.navigate([this.data.data[2]])
                                                                    .catch(console.log)
                                      })
                                      .catch(async () => swal('data not deleted'))
                                                        .catch(() => console.log('popup failed'))
                      }
                     })
                     .catch(async () => swal('Disposal not inserted'))
                                      .catch(() => console.log('popup failed'))
      })
    }
  }
}
