import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { HttpClient } from '@angular/common/http'
import swal from 'sweetalert'
import { FlashSaleService } from '../flashsale.service'

let flash_data: any[] = []

@Component({
  selector: 'component-add-dialog-data-dialog',
  styleUrls: ['./add-dialog-data.css'],
  templateUrl: 'add-dialog-data-dialog.html'
})
export class AddDialogDataComponent implements OnInit {
  @ViewChild('date') dateSel: ElementRef
  form: FormGroup
  formSubmitAttempt: boolean
  curField: any
  returnUrl: string
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  dataSource = new MatTableDataSource()
  selection = new SelectionModel<Warning>(true, [])
  displayedColumns = ['select', 'sku', 'name', 'qty_unsold', 'status', 'projectedExpiry']

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private addServ: FlashSaleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data.data.InventoryQueryItem)
    this.dataSource.data = this.data.data.InventoryQueryItem
    flash_data = this.data.data.InventoryQueryItem
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
      this.curField = flash_data.filter(i => i.itemID === item.itemID)[0]
      this.curField.onFlashsale = true
      console.log(this.curField)
      this.addServ.newFlashSale(this.curField)
                  .toPromise()
                  .then((data: any) => {
                    if (data.data.FlashsaleInsert) {
                      console.log(data.data.FlashsaleInsert)
                      swal('Flash sale created!')
                        .catch(err => console.log(err))
                    }
                  })
                  .catch(async () => swal('Flash sale not created!')
                                    .catch(err => console.log(err))
                  )
      console.log('++++++++++++++++++==')
    })

    }
  }
