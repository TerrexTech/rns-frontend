import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { HttpClient } from '@angular/common/http'
import swal from 'sweetalert'
import { AddFlashSaleService } from './add-dialog-data.service'

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
    private addServ: AddFlashSaleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.dataSource.data = this.data
    flash_data = this.data
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  isFieldValid(field: string): any {
    return this.formSubmitAttempt && this.form.controls[field].status === 'INVALID'
  }

  f(): any { return this.form.controls }

  onSubmit(): void {
    this.selection.selected.forEach(item => {
      this.curField = flash_data.filter(i => i.itemID === item.itemID)[0]
      console.log(this.curField)
      console.log('++++++++++++++++++==')
    })
    this.addServ.newFlashSale(this.curField)

    }
  }
