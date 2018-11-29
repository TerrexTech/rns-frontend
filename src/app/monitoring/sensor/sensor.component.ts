import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import swal from 'sweetalert'
import { HttpClient } from '@angular/common/http'
import { MonitorSearchComponent } from '../../search/monitor-search/monitor-search.component'
import { SensorService } from './sensor.service'
import { TableSearchComponent } from '../../search/table-search/table-search.component'

@Component({
  selector: 'component-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource = new MatTableDataSource()
  displayedColumns = ['deviceID', 'sku', 'name', 'status', 'dateInstalled']

  sensorData: any
  constructor(private http: HttpClient, public dialog: MatDialog, private sensorServ: SensorService) {
  }

  ngOnInit(): void {
     this.sensorServ.getTable()
                    .toPromise()
                    .then((data: any) => {
                      console.log(data)
                      this.dataSource.data = data.data.DeviceQueryCount
                      this.dataSource.paginator = this.paginator
                      this.dataSource.sort = this.sort
                    })
                    .catch(async () => swal('No Sensors')
                                  .catch(err => console.log(err))
                    )
  }

  openSearch(): void {
    this.dialog.open(TableSearchComponent, {
      width: '500px',
      data: 'device'
    })
      .afterClosed()
      .subscribe(
        data => {
          if (data) {
          console.log(data)
          if (!data) {
          }
          if (data.queryNum === 1) {
            this.dataSource.data = data.data.DeviceQueryItem
          }
          else if (data.queryNum === 2) {
            this.dataSource.data = data.data.DeviceQueryTimestamp
          }
          else if (!data.queryNum) {
            console.log('Search closed')
          }
        }
      }
        // refreshDataMethod()
      )
  }

  showPopup(): void {
      const popup = document.getElementById('myPopup')
      popup.classList.toggle('show')
  }

}
