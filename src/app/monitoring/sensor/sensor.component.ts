import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { HttpClient } from '@angular/common/http'
import { MonitorSearchComponent } from '../../search/monitor-search/monitor-search.component'

@Component({
  selector: 'component-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  sensorData: any
  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.openSearch()
  }

  openSearch(): void {
    this.dialog.open(MonitorSearchComponent, {
      width: '500px'
    })
      .afterClosed()
      .subscribe(
        data => this.sensorData = data

      )

  }

  showPopup(): void {
      const popup = document.getElementById('myPopup')
      popup.classList.toggle('show')
  }

}
