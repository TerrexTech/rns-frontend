import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../config'
import { SendDate } from '../../models'
import { Chart } from 'chart.js'
import { MatDialog } from '@angular/material'
import * as jspdf from 'jspdf'
import * as html2canvas from 'html2canvas'
import { MockUtils } from '../mocks'
import { ReportSearchComponent } from '../../search/report-search/report-search.component'
import { setTimeout } from 'timers'

@Component({
  selector: 'component-ethylene-report',
  templateUrl: './ethylene-report.component.html',
  styleUrls: ['./ethylene-report.component.css']
})
export class EthyleneReportComponent implements OnInit {
  ethyChart: any
  date: Date = new Date()
  isClicked: boolean
  searchData: any
  // @Output() messageEvent = new EventEmitter<string>()
  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isClicked = true
    this.loadEthyleneGraph()
  }

  openSearch(): void {
    this.dialog.open(ReportSearchComponent, {
      width: '500px'
    })
    .afterClosed()
    .subscribe(
      data => this.searchData = data
    )

  }

  loadEthyleneGraph(): void {
    const mock = new MockUtils()
    mock.genEthyData()
    console.log('7&&&&&&&&&&&&&&&&&&&')
    const arr1 = JSON.parse(localStorage.getItem('arr1'))
    console.log(arr1.map(e => {
      return e.Ethylene
    }))
    // console.log(mock.genFloat(30, 90))
    // this.ethyData = mock.genFloat(30, 90)
    // this.dataSource.data = this.ethyData
    this.ethyChart = new Chart('ethylene', {
      type: 'line',
      // data: {
      //   datasets: [
      //     {
      //       label: 'Ethylene level',
      //       data: this.data,
      //       backgroundColor: 'rgba(255, 99, 132, 1)',
      //       fill: false
      //     }
      //   ]
      // },
      // options: {
      //   responsive: true,
      //   hover: {
      //     mode: 'dataset'
      //   },
      //   legend: {
      //     display: true
      //   },
      //   scales: {
      //     xAxes: [{
      //       display: true,
      //       scaleLabel: {
      //         display: true,
      //         labelString: 'Period'
      //       }
      //     }],
      //     yAxes: [{
      //       display: true,
      //       scaleLabel: {
      //         display: true,
      //         labelString: 'PPM'
      //       },
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }]
      //   }
      // }

      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'Ethylene',
          data: arr1.map(e => {
            console.log(parseFloat(e.Ethylene))

            return parseFloat(e.Ethylene)
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
              labelString: 'PPM'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    // this.getJSON().subscribe(dataArr => {
    //   console.log(dataArr)
    //   const metrics: any = [
    //     []
    //   ]
    //   // total_weight: 195, sold_weight: 58, waste_weight: 49
    //   Object.keys(dataArr).forEach(k => {
    //     const prods = dataArr[k]
    //     const date = new Date(prods.dates * 1000).toDateString()
    //     this.ethyChart.data.labels.push(date)
    //     metrics[0].push(prods.Ethylene)
    //   })

    //   this.ethyChart.data.datasets.forEach((dataset, index) =>
    //     dataset.data = dataset.data.concat(metrics[index])
    //   )
    //   this.ethyChart.update()

    //   // Moving Graph
    //   // setInterval(() => {
    //   //   this.ethyChart.data.datasets.forEach((dataset, index) => {
    //   //     const metric = dataset.data.shift()
    //   //     dataset.data.push(metric + 1)
    //   //   })
    //   //   this.ethyChart.update()
    //   // }, 40000)
    // })
  }

  getJSON(): any {

    // var sendDates = []

    // const sendDate = new SendDate()
    // sendDate.end_date = this.getDays(1)[0]
    // sendDate.start_date = this.getDays(1)[1]

    // let resource = `{
    //     login(start_date:'${sendDate.start_date}',end_date:'${sendDate.end_date}')
    //     {

    //     }
    //   }`

    // console.log(this.http)
    // this.http.post('http://162.212.158.16:30653/api', resource)
    //   .toPromise()
    //   // .then(d => this.data)
    //   .then((data: any) => {
    //     console.log(data.data)
    //     if (data.data !== null) {

    //     }
    //     // else {
    //     //   this.showError = true
    //     // }
    //   })

  }

  getToday(): any {
    let sendDates = []

    const sendDate = new SendDate()
    sendDate.end_date = this.getDays(1)[0]
    // sendDate.start_date = this.getDays(0)[1]
    console.log(sendDate)
    sendDates = [sendDate]
    const url = '/total-inv'

    return this.http.post(environment.apiUrl + url, sendDates, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getDays(days?: number): any[] {
    let dates = []
    const end_date = Math.round((new Date().getTime() / 1000) + (days * 86400))
    const start_date = Math.round(new Date().getTime() / 1000) - (days * 86400)

    return dates = [
      end_date, start_date
    ]
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
