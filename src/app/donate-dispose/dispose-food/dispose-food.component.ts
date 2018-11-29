import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { NavbarService } from '../../shared/navbar/navbar.service'
import { TableSearchComponent } from '../../search/table-search/table-search.component'
import { DonateDisposeService } from '../donate-dispose.service'

// let disposedItems: any[] = []

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
                       this.setValues()
                     }
                   })
                   .catch(async () => swal('No disposals.')
                        .catch(err => console.log(err)))
  }

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px',
      data: 'disposePage'
    })
      .afterClosed()
      .subscribe(
        data => {
          if (data) {
          console.log(data)
          if (!data) {
          }
          if (data.queryNum === 1) {
            this.dataSource.data = data.data.DisposalQueryItem
          }
          else if (data.queryNum === 2) {
            this.dataSource.data = data.data.DisposalQueryTimestamp
          }
          else if (!data.queryNum) {
            console.log('Search closed')
          }
        }
      }
        // refreshDataMethod()
      )
  }

  setValues(): void {
    this.dataSource.data.forEach(element => {
      element['disposalWeight'] = Number((element['disposalWeight']).toFixed(2))
    })
    const sorting: MatSortable = {
     id: 'timestamp',
     start: 'asc',
     disableClear: false
 }
    this.sort.sort(sorting)
  }

  addNewDisposal(): void {
    this.dialog.open(TableSearchComponent, {
      data: 'disposePage'
    })
    .afterClosed()
      .subscribe(searchData => {
        if (searchData) {
          this.dialog.open(DialogDataDialogComponent, {
            data: [searchData, 'disposal'],
            minWidth: 800,
            minHeight: 600
          })
          .afterClosed()
          .subscribe(recieved => {

            this.disposeServ.getDisposals()
                   .toPromise()
                   .then((data: any) => {
                     console.log(data)
                     if (data.data.DisposalQueryCount) {
                       this.dataSource.data = data.data.DisposalQueryCount
                       this.dataSource.paginator = this.paginator
                       this.dataSource.sort = this.sort
                       this.setValues()
                     }
                   })
                   .catch(async () => swal('No disposals.')
                        .catch(err => console.log(err)))

          })
        }
      })
  }
}
