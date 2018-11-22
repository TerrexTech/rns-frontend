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

let wasteChartData = []

@Component({
  selector: 'component-waste-report',
  templateUrl: './waste-report.component.html',
  styleUrls: ['./waste-report.component.css']
})
export class WasteReportComponent implements OnInit {

  wasteChart: any
  date: Date = new Date()
  displayedColumns: string[] =
  ['sku', 'name', 'avgTotal', 'avgWaste', 'price']
  dataSource = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  Math: any
  isClicked: boolean

  constructor(private http: HttpClient, public dialog: MatDialog, public wasteServ: ReportService) {
    this.Math = Math
  }

  ngOnInit(): void {
    this.wasteServ.getWasteReport()
    .toPromise()
    .then((data: any) => {
      if (data.data.Waste) {
       console.log(data.data.Waste)
       wasteChartData = data.data.Waste
       this.dataSource.data = data.data.Waste
       console.log(wasteChartData)
       this.loadWasteGraph()
       this.dataSource.data.forEach(element => {
        element['avgTotal'] = (element['avgTotal']).toFixed(2)
        element['avgWaste'] = (element['avgWaste']).toFixed(2)

        switch (element['_id']['name']) {
          case 'Apple':
            element['price'] = (element['avgWaste'] * 4.53).toFixed(2)
            break
          case 'Banana':
            element['price'] = (element['avgWaste'] * 1.61).toFixed(2)
            break
          case 'Orange':
            element['price'] = (element['avgWaste'] * 3.91).toFixed(2)
            break
          case 'Mango':
            element['price'] = (element['avgWaste'] * 7.49).toFixed(2)
            break
          case 'Strawberry':
            element['price'] = (element['avgWaste'] * 5).toFixed(2)
            break
          case 'Tomato':
            element['price'] = (element['avgWaste'] * 2).toFixed(2)
            break
          case 'Pear':
            element['price'] = (element['avgWaste'] * 4).toFixed(2)
            break
          case 'Grapes':
            element['price'] = (element['avgWaste'] * 4).toFixed(2)
            break
          case 'Lettuce':
            element['price'] = (element['avgWaste'] * 1.44).toFixed(2)
            break
          case 'Sweet Pepper':
            element['price'] = (element['avgWaste'] * 9.90).toFixed(2)
            break
          default:
            console.log('No price available')
        }
        })
  }
})
.catch(async () => swal('Error loading Waste graph data')
                      .catch(() => console.log('error: popup failed')))
}
  loadWasteGraph(): void {
    this.wasteChart = new Chart('waste', {
      type: 'bar',
      data: {
        labels: wasteChartData.map(e => {
          return e._id.name
        }),
        datasets: [{
          label: 'Total Product',
          data: wasteChartData.map(e => {
            return parseFloat(e.avgTotal)
          }),
          backgroundColor: 'rgba(153,255,51,0.4)'
        },
        {
          label: 'Product left over',
          data: wasteChartData.map(e => {
            return parseFloat(e.avgWaste)
          }),
          backgroundColor: 'rgba(153,55,51,0.4)'
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
              labelString: 'Waste Weight (Kg)'
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
