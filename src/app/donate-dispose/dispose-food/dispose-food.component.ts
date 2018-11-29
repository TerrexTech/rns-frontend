import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { NavbarService } from '../../shared/navbar/navbar.service'
import { TableSearchComponent } from '../../search/table-search/table-search.component'
import { DonateDisposeService } from '../donate-dispose.service'

let disposedItems: any[] = []

@Component({
  selector: 'component-dispose-food',
  templateUrl: './dispose-food.component.html',
  styleUrls: ['./dispose-food.component.css']
})
export class DisposeFoodComponent implements OnInit {

  constructor(
              public dialog: MatDialog,
              private navServ: NavbarService,
              public disposeServ: DonateDisposeService
             ) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selectedItems = new SelectionModel<Warning>(true, [])

  displayedColumns = ['sku', 'name', 'disposalWeight', 'timestamp']
  curField: any

  ngOnInit(): void {
    this.navServ.newEvent(0)

    this.disposeServ.getDisposals()
                   .toPromise()
                   .then((data: any) => {
                     console.log(data)
                     if (data.data.DisposalQueryCount) {
                       this.dataSource.data = data.data.DisposalQueryCount
                       this.dataSource.paginator = this.paginator
                       this.dataSource.sort = this.sort
                     }
                   })
                   .catch(async () => swal('No disposals.')
                        .catch(err => console.log(err)))
  }

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px'
    })
      .afterClosed()
      .subscribe(data => {
        if (data) {
        disposedItems = data
        }
        // else {
        //   swal('No Results.')
        //       .catch(err => console.log(err))
        // }
      })
  }

  populateFields(): void {
    this.selectedItems.selected.forEach(item => {
      console.log(item)
      this.curField = item
      console.log(this.curField)
    })
    this.dialog.open(DialogDataDialogComponent, {
      data: {
        data: [this.curField, 'Dispose']
      }
    })
  }

}
