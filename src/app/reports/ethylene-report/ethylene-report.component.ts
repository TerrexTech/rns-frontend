import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../config'
import { SendDate } from '../../models'
import { Chart } from 'chart.js'
import * as jspdf from 'jspdf'
import * as html2canvas from 'html2canvas'
import { MockUtils } from '../mocks'
import { ReportSearchComponent } from '../../search/report-search/report-search.component'
import { ReportService } from '../reports.service'
import {
  MatDialog,
  MatPaginator,
  MatRow,
  MatSort,
  MatSortable,
  MatTableDataSource
} from '@angular/material'

let ethyChartData = []

@Component({
  selector: 'component-ethylene-report',
  templateUrl: './ethylene-report.component.html',
  styleUrls: ['./ethylene-report.component.css']
})
export class EthyleneReportComponent implements OnInit {
  ethyChart: any
  date: Date = new Date()
  displayedColumns: string[] =
  ['sku', 'name', 'avgEthylene', 'avgCarbonDioxide', 'avgTempIn', 'avgHumidity']
  dataSource = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  Math: any
  isClicked: boolean

  constructor(private http: HttpClient, public dialog: MatDialog, public ethyServ: ReportService) {
    this.Math = Math
  }

  ngOnInit(): void {
    this.ethyServ.getEthyleneReport()
    .toPromise()
    .then((data: any) => {
      if (data.data.EthyleneCO2) {
       console.log(data.data.EthyleneCO2)
       ethyChartData = data.data.EthyleneCO2
       this.dataSource.data = data.data.EthyleneCO2
       console.log(ethyChartData)
       this.loadEthyleneGraph()
       this.dataSource.data.forEach(element => {
        element['avgEthylene'] = (element['avgEthylene']).toFixed(2)
        element['avgCarbonDioxide'] = (element['avgCarbonDioxide']).toFixed(2)
        element['avgTempIn'] = (element['avgTempIn']).toFixed(2)
        element['avgHumidity'] = (element['avgHumidity']).toFixed(2)
       })
  }
})
.catch(async () => swal('Error loading Ethylene graph data')
                      .catch(() => console.log('error: popup failed')))
}

  loadEthyleneGraph(): void {
    this.ethyChart = new Chart('ethylene', {
      type: 'bar',
      data: {
        labels: ethyChartData.map(e => {
          return e._id.name
        }) ,
        datasets: [{
          label: 'Ethylene',
          data: ethyChartData.map(e => {
            return parseFloat(e.avgEthylene)
          }),
          backgroundColor: 'rgba(153,255,51,0.4)'
        },
        {
          label: 'Carbon Dioxide',
          data: ethyChartData.map(e => {
            return e.avgCarbonDioxide
          }),
          backgroundColor: 'rgba(153,25,51,0.4)'
        }]
      },
      options: {
        responsive: true,
        hover: {
          mode: 'dataset'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Products'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: ' Average Quantity (PPM)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

  captureScreen(): void {
    this.isClicked = false

    setTimeout(() => {
      const data = document.getElementById('testCapture')
      console.log(data)
      html2canvas(data)
        .then(canvas => {
          // Few necessary setting options
          const imgWidth = 208
          const pageHeight = 295
          const imgHeight = canvas.height * imgWidth / canvas.width
          let heightLeft = imgHeight

          const contentDataURL = canvas.toDataURL('image/png')
          const pdf = new jspdf('p', 'mm') // A4 size page of PDF
          let position = 0

          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight
            pdf.addPage()
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight
          }

          pdf.save('MYPdf.pdf') // Generated PDF
          this.isClicked = true
        })
    }, 1000)
  }

}
