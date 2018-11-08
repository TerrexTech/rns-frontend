import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { Http } from '@angular/http'
import swal from 'sweetalert'

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
  displayedColumns = ['sku', 'name', 'qty. unsold', 'status', 'projected expiry']

  constructor(
  private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private route: ActivatedRoute,
  private router: Router
             ) { }

  ngOnInit(): void {
    console.log(this.data.data)
    this.dataSource.data = this.data.data[0]

    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  onSubmit(): void {

    this.router.navigate([this.data.data[2]])
               .catch(console.log)
  }
}
