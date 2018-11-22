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

let flashChartData = []

@Component({
  selector: 'component-flash-sale-report',
  templateUrl: './flash-sale-report.component.html',
  styleUrls: ['./flash-sale-report.component.css']
})
export class FlashSaleReportComponent implements OnInit {
  flashChart: any
  date: Date = new Date()
  displayedColumns: string[] =
  ['sku', 'name', 'avgTotal', 'avgSold', 'avgTotal', 'avgFlashSold']
  dataSource = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  Math: any
  isClicked: boolean

  constructor(private http: HttpClient, public dialog: MatDialog, private flashServ: ReportService) {
  }

  ngOnInit(): void {
    this.flashServ.getFlashSaleReport()
    .toPromise()
    .then((data: any) => {
      if (data.data.FlashSale) {
       console.log(data.data.FlashSale)
       flashChartData = data.data.FlashSale
       this.dataSource.data = data.data.FlashSale
       console.log(flashChartData)
       this.loadFlashGraph()
       this.dataSource.data.forEach(element => {
        element['avgTotal'] = (element['avgTotal']).toFixed(2)
        element['avgSold'] = (element['avgSold']).toFixed(2)
        element['avgFlashSold'] = (element['avgFlashSold']).toFixed(2)
       })
  }
})
.catch(async () => swal('Error loading Flash sale graph data')
                      .catch(() => console.log('error: popup failed')))
}

  loadFlashGraph(): void {
    this.flashChart = new Chart('flash', {
      type: 'bar',
      data: {
        labels: flashChartData.map(e => {
          return e._id.name
        })  ,
        datasets: [{
          label: 'Product Sold',
          data: flashChartData.map(e => {
            return parseFloat(e.avgSold)
          }),
          backgroundColor: 'rgba(153,255,51,0.4)'
        },
          {
            label: 'Sold during flash sale',
            data: flashChartData.map(e => {
              return parseFloat(e.avgFlashSold)
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
              labelString: 'Product Weight (Kg)'
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
