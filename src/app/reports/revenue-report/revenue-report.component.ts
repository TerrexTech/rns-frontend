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

let revChartData = []

@Component({
  selector: 'component-revenue-report',
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./revenue-report.component.css']
})
export class RevenueReportComponent implements OnInit {
  revChart: any
  date: Date = new Date()
  displayedColumns: string[] =
  ['sku', 'name', 'prevSoldWeight', 'soldWeight', 'revenuePrev', 'revenueCurr', 'revenuePercent']
  dataSource = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  Math: any
  isClicked: boolean

  constructor(private http: HttpClient, public dialog: MatDialog, public revServ: ReportService) {
    this.Math = Math
  }

  ngOnInit(): void {
      this.revServ.getRevenueReport()
      .toPromise()
      .then((data: any) => {
        if (data.data.Revenue) {
         console.log(data.data.Revenue)
         revChartData = data.data.Revenue
         this.dataSource.data = data.data.Revenue
         console.log(revChartData)
         this.loadRevGraph()
         this.dataSource.data.forEach(element => {
          element['prevSoldWeight'] = (element['prevSoldWeight']).toFixed(2)
          element['soldWeight'] = (element['soldWeight']).toFixed(2)
          element['revenuePrev'] = (element['revenuePrev']).toFixed(2)
          element['revenueCurr'] = (element['revenueCurr']).toFixed(2)
          element['revenuePercent'] = (element['revenuePercent']).toFixed(2)
        })
    }
  })
  .catch(async () => swal('Error loading Revenue graph data')
                        .catch(() => console.log('error: popup failed')))
  }

  loadRevGraph(): void {
    this.revChart = new Chart('revenue', {
      type: 'bar',
      data: {
        labels: revChartData.map(e => {
          return e.name
        }),
        datasets: [{
          label: 'Previous Waste',
          data: revChartData.map(e => {
            return parseFloat(e.revenuePrev)
          }),
          backgroundColor: 'rgba(153,25,51,0.4)'
        },
          {
            label: 'Current Waste',
            data: revChartData.map(e => {
              return parseFloat(e.revenueCurr)
            }),
            backgroundColor: 'rgba(153,255,51,0.4)'
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
              labelString: 'Period'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Products'
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
