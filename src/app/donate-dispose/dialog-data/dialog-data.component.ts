import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { HttpClient } from '@angular/common/http'
import swal from 'sweetalert'
import { DonateDisposeService } from '../donate-dispose.service'

@Component({
  selector: 'component-dialog-data-dialog',
  templateUrl: 'dialog-data-dialog.html',
  styleUrls: ['dialog-data-dialog.css']
})
export class DialogDataDialogComponent implements OnInit {
  @ViewChild('date') dateSel: ElementRef
  form: FormGroup
  formSubmitAttempt: boolean
  curField: any
  returnUrl: string
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  pageType: string

  dataSource = new MatTableDataSource()
  selection = new SelectionModel<Warning>(true, [])
  displayedColumns = ['select', 'sku', 'name']

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private addServ: DonateDisposeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

    ngOnInit(): void {
    console.log(this.data)
    this.dataSource.data = this.data[0].data.InventoryQueryItem
    this.pageType = this.data[1]
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.dataSource.data.forEach(element => {
      element['status'] = 'Expiring soon'
    })
  }

  isFieldValid(field: string): any {
    return this.formSubmitAttempt && this.form.controls[field].status === 'INVALID'
  }

  f(): any { return this.form.controls }

  onSubmit(): void {
    this.selection.selected.forEach(item => {
      console.log(item)
      if (this.pageType === 'donation') {
        this.insertDonation(item)
      }
      else {
        this.insertDisposal(item)
      }
      console.log('++++++++++++++++++==')
    })
}

insertDonation(item): void {
  this.addServ.newDonation(item)
                  .toPromise()
                  .then((data: any) => {
                    if (data.data.DonationInsert) {
                      console.log(data.data.DonationInsert)
                      swal('New Donation added!')
                        .catch(err => console.log(err))
                    }
                  })
                  .catch(async () => swal('Donation not added!')
                                    .catch(err => console.log(err))
                  )
}

insertDisposal(item): void {
  this.addServ.newDisposal(item)
                  .toPromise()
                  .then((data: any) => {
                    if (data.data.DisposalInsert) {
                      console.log(data.data.DisposalInsert)
                      swal('New Disposal added!')
                        .catch(err => console.log(err))
                    }
                  })
                  .catch(async () => swal('Disposal not added!')
                                    .catch(err => console.log(err))
                  )
}

}
