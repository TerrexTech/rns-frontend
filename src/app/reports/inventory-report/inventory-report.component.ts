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

let invChartData = []

@Component({
  selector: 'component-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})

export class InventoryReportComponent implements OnInit {
  invChart: any
  date: Date = new Date()
  displayedColumns: string[] =
  ['sku', 'name', 'avgSold', 'avgTotal', 'price']
  dataSource = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  Math: any
  isClicked: boolean

  constructor(private http: HttpClient, public dialog: MatDialog, public invServ: ReportService) {
    this.Math = Math
  }

  ngOnInit(): void {
    this.invServ.getInventoryReport()
    .toPromise()
    .then((data: any) => {
      if (data.data.ItemSold) {
       console.log(data.data.ItemSold)
       invChartData = data.data.ItemSold
       this.dataSource.data = data.data.ItemSold
       console.log(invChartData)
       this.loadInvGraph()
       this.dataSource.data.forEach(element => {
        element['avgSold'] = (element['avgSold']).toFixed(2)
        element['avgTotal'] = (element['avgTotal']).toFixed(2)

        switch (element['_id']['name']) {
          case 'Apple':
            console.log('here')
            element['price'] = (element['avgSold'] * 4.53).toFixed(2)
            break
            case 'Banana':
            console.log('here')
            element['price'] = (element['avgSold'] * 1.61).toFixed(2)
            break
            case 'Orange':
            console.log('here')
            element['price'] = (element['avgSold'] * 3.91).toFixed(2)
            break
            case 'Mango':
            console.log('here')
            element['price'] = (element['avgSold'] * 7.49).toFixed(2)
            break
            case 'Strawberry':
            console.log('here')
            element['price'] = (element['avgSold'] * 5).toFixed(2)
            break
            case 'Tomato':
            console.log('here')
            element['price'] = (element['avgSold'] * 2).toFixed(2)
            break
            case 'Pear':
            console.log('here')
            element['price'] = (element['avgSold'] * 4).toFixed(2)
            break
            case 'Grapes':
            console.log('here')
            element['price'] = (element['avgSold'] * 4).toFixed(2)
            break
            case 'Lettuce':
            console.log('here')
            element['price'] = (element['avgSold'] * 1.44).toFixed(2)
            break
            case 'Sweet Pepper':
            console.log('here')
            element['price'] = (element['avgSold'] * 9.90).toFixed(2)
            break
          default:
            console.log('No price available')
        }
      })
      }
    })
    .catch(async () => swal('Error loading Inventory graph data')
                      .catch(() => console.log('error: popup failed')))
  }

  loadInvGraph(): void {
    console.log('7&&&&&&&&&&&&&&&&&&&')
    const mock = new MockUtils()
    this.invChart = new Chart('inventory', {
      type: 'bar',
      data: {
        labels: invChartData.map(e => {
          return e._id.name
        }),
        datasets: [{
          label: 'Avg. Total Weight',
          data: invChartData.map(e => {
            return parseFloat(e.avgTotal)
          }),
          backgroundColor: 'rgba(153,255,51,0.4)'
        },
          {
            label: 'Avg. Sold Weight',
            data: invChartData.map(e => {
              return parseFloat(e.avgSold)
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
