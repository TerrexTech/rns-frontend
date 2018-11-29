import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'
import { Warning } from '../../models/warning'
import { DialogDataDialogComponent } from '../dialog-data/dialog-data.component'
import { NavbarService } from '../../shared/navbar/navbar.service'
import { TableSearchComponent } from '../../search/table-search/table-search.component'
import { DonateDisposeService } from '../donate-dispose.service'

let donatedItems: any[] = []

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

  displayedColumns = ['sku', 'name', 'qty_unsold', 'timestamp']
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
                     }
                   })
                   .catch(async () => swal('No donations.')
                        .catch(err => console.log(err)))
  }

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px'
    })
      .afterClosed()
      .subscribe(data => {
        if (data) {
        donatedItems = data
        }
        // else {
        //   swal('No Results.')
        //       .catch(err => console.log(err))
        // }
      })
  }

  addNewDonation(): void {
    this.dialog.open(TableSearchComponent)
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
                     }
                   })
                   .catch(async () => swal('No donations.')
                        .catch(err => console.log(err)))

          })
        }
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
        data: [this.curField, 'Donate']
      }
    })
  }
}
