import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { Employee } from '../../models/employee'
import { SelectionModel } from '@angular/cdk/collections'
import swal from 'sweetalert'
import { FlashSaleService } from '../flashsale.service'
import { TableSearchComponent } from '../../search/table-search/table-search.component'

@Component({
  selector: 'component-flashsale-history',
  templateUrl: './flashsale-history.component.html',
  styleUrls: ['./flashsale-history.component.css']
})
export class FlashsaleHistoryComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  displayedColumns = ['sku', 'name', 'lot', 'soldWeight', 'totalWeight', 'remainingWeight']

  constructor(public dialog: MatDialog, public flashServ: FlashSaleService) { }

  ngOnInit(): void {
    this.flashServ.getFlashSales()
                  .toPromise()
                  .then((data: any) => {
                    console.log(data)
                    if (data.data.FlashsaleQueryCount) {
                      this.dataSource.data = data.data.FlashsaleQueryCount.filter(item => !item.onFlashsale)
                      this.dataSource.paginator = this.paginator
                      const sorting: MatSortable = {
                        id: 'timestamp',
                        start: 'asc',
                        disableClear: false
                    }
                      this.sort.sort(sorting)
                      this.dataSource.sort = this.sort
                    }
                  })
                  .catch(async () => swal('No Flash sales')
                                  .catch(err => console.log(err))
                  )
  }

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px',
      data: 'flashHistory'
    })
      .afterClosed()
      .subscribe(
        data => {
          if (data) {
          console.log(data)
          if (!data) {
          }
          if (data.queryNum === 1) {
            this.dataSource.data = data.data.FlashsaleQueryItem.filter(item => !item.onFlashsale)
          }
          else if (data.queryNum === 2) {
            this.dataSource.data = data.data.FlashsaleQueryTimestamp.filter(item => !item.onFlashsale)
          }
          else if (!data.queryNum) {
            console.log('Search closed')
          }
        }
      }
        // refreshDataMethod()
      )
  }

}
