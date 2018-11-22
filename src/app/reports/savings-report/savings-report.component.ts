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

let savingsChartData = []

@Component({
  selector: 'component-savings-report',
  templateUrl: './savings-report.component.html',
  styleUrls: ['./savings-report.component.css']
})
export class SavingsReportComponent implements OnInit {
  savingsChart: any
  date: Date = new Date()
  displayedColumns: string[] =
  ['sku', 'name', 'prevWasteWeight', 'wasteWeight', 'amWastePrev', 'amWasteCurr', 'savingsPercent']
  dataSource = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  Math: any
  isClicked: boolean

  constructor(private http: HttpClient, public dialog: MatDialog, public savingServ: ReportService) {
    this.Math = Math
  }

  ngOnInit(): void {
    this.savingServ.getSavingsReport()
    .toPromise()
    .then((data: any) => {
      if (data.data.Savings) {
       console.log(data.data.Savings)
       savingsChartData = data.data.Savings
       this.dataSource.data = data.data.Savings
       console.log(savingsChartData)
       this.loadSavingsGraph()
       this.dataSource.data.forEach(element => {
        element['prevWasteWeight'] = (element['prevWasteWeight']).toFixed(2)
        element['wasteWeight'] = (element['wasteWeight']).toFixed(2)
        element['amWastePrev'] = (element['amWastePrev']).toFixed(2)
        element['amWasteCurr'] = (element['amWasteCurr']).toFixed(2)
        element['savingsPercent'] = (element['savingsPercent']).toFixed(2)
      })
  }
})
.catch(async () => swal('Error loading Savings graph data')
                      .catch(() => console.log('error: popup failed')))
}

  loadSavingsGraph(): void {
    this.savingsChart = new Chart('savings', {
      type: 'bar',

      data: {
        labels: savingsChartData.map(e => {
          return e.name
        }),
        datasets: [{
          label: 'Previous Savings',
          data: savingsChartData.map(e => {
            console.log(parseFloat(e))

            return parseFloat(e.amWastePrev)
          }),
          backgroundColor: 'rgba(153,25,51,0.4)'
        },
        {
          label: 'Current Savings',
          data: savingsChartData.map(e => {
            console.log(parseFloat(e))

            return parseFloat(e.amWasteCurr)
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
