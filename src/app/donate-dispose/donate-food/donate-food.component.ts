import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { NavbarService } from '../../shared/navbar/navbar.service'
import { TableSearchComponent } from '../../search/table-search/table-search.component'
import { DonateDisposeService } from '../donate-dispose.service'

// let donatedItems: any[] = []

@Component({
  selector: 'component-donate-food',
  templateUrl: './donate-food.component.html',
  styleUrls: ['./donate-food.component.css']
})
export class DonateFoodComponent implements OnInit {

  constructor(
              public dialog: MatDialog,
              private navServ: NavbarService,
              public donateServ: DonateDisposeService
             ) { }
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  selectedItems = new SelectionModel<Warning>(true, [])

  displayedColumns = ['sku', 'name', 'donateWeight', 'timestamp']
  curField: any

  ngOnInit(): void {
    this.navServ.newEvent(0)

    this.donateServ.getDonations()
                   .toPromise()
                   .then((data: any) => {
                     console.log(data)
                     if (data.data.DonationQueryCount) {
                       this.dataSource.data = data.data.DonationQueryCount
                       this.dataSource.paginator = this.paginator
                       this.dataSource.sort = this.sort
                       this.setValues()
                     }
                   })
                   .catch(async () => swal('No donations.')
                        .catch(err => console.log(err)))
  }

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px',
      data: 'donatePage'
    })
      .afterClosed()
      .subscribe(
        data => {
          if (data) {
          console.log(data)
          if (!data) {
          }
          if (data.queryNum === 1) {
            this.dataSource.data = data.data.DonationQueryItem
          }
          else if (data.queryNum === 2) {
            this.dataSource.data = data.data.DonationQueryTimestamp
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
      element['donateWeight'] = Number((element['donateWeight']).toFixed(2))
    })
    const sorting: MatSortable = {
     id: 'timestamp',
     start: 'asc',
     disableClear: false
 }
    this.sort.sort(sorting)
  }

  addNewDonation(): void {
    this.dialog.open(TableSearchComponent, {
      data: 'donatePage'
    })
    .afterClosed()
      .subscribe(searchData => {
        if (searchData) {
          this.dialog.open(DialogDataDialogComponent, {
            data: [searchData, 'donation'],
            minWidth: 800,
            minHeight: 600
          })
          .afterClosed()
          .subscribe(recieved => {

            this.donateServ.getDonations()
                   .toPromise()
                   .then((data: any) => {
                     console.log(data)
                     if (data.data.DonationQueryCount) {
                       this.dataSource.data = data.data.DonationQueryCount
                       this.dataSource.paginator = this.paginator
                       this.dataSource.sort = this.sort
                       this.setValues()
                     }
                   })
                   .catch(async () => swal('No donations.')
                        .catch(err => console.log(err)))

          })
        }
      })
  }
}
