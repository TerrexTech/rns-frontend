import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../config'
import { SendDate } from '../../models'
import { Chart } from 'chart.js'
import { MockMonitor } from '../mocks-monitor'
import { MatDialog } from '@angular/material'
import { MonitorSearchComponent } from '../../search/monitor-search/monitor-search.component'

@Component({
  selector: 'component-carbon',
  templateUrl: './carbon.component.html',
  styleUrls: ['./carbon.component.css']
})
export class CarbonComponent implements OnInit {
  ethyleneChart: any
  carbonChart: any
  tempChart: any
  fruitName: string
  sku: string
  lot: string
  searchResultsData: any
  ethyValue: string
  date: Date = new Date()

  public carbonCanvasWidth = 200
  public carbonNeedleValue = 20
  public carbonCentralLabel = ''
  public carbonName = 'Carbon Levels (PPM)'
  public carbonBottomLabel = this.carbonNeedleValue.toString()
  public carbonOptions = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [20],
    rangeLabel: ['0', '100'],
    needleStartValue: 50
  }

  public ethyCanvasWidth = 200
  public ethyNeedleValue = 20
  public ethyCentralLabel = ''
  public ethyName = 'Ethylene Levels (PPM)'
  public ethyBottomLabel = this.ethyNeedleValue.toString()
  public ethyOptions = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [this.ethyNeedleValue],
    rangeLabel: ['0', '100'],
    needleStartValue: 50
  }

  public tempCanvasWidth = 200
  public tempNeedleValue = 20
  public tempCentralLabel = ''
  public tempName = 'Temperature Levels (PPM)'
  public tempBottomLabel = this.tempNeedleValue.toString()
  public tempOptions = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [20],
    rangeLabel: ['0', '100'],
    needleStartValue: 50
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.openSearch()
  }

  openSearch(): void {
    this.dialog.open(MonitorSearchComponent, {
      width: '500px',
      disableClose: true
    })
    .afterClosed()
    .subscribe(data => {
      console.log(data)
      console.log(data.data.InventoryQueryItem)
      this.searchResultsData = data.data.InventoryQueryItem[0]
      this.fruitName = this.searchResultsData.name
      this.sku = this.searchResultsData.sku
      this.lot = this.searchResultsData.lot
      this.loadCarbonGraph()
      this.loadEthyGraph()
      this.loadTempGraph()
    })
  }

  loadCarbonGraph(): void {
    console.log(this.carbonOptions.rangeLabel[1])
    // this.openSearch()
    let warningItem: any
    const m = new MockMonitor()
    let mockData = []
    let mockData2 = []
    let mockDataFinal = []

    if (localStorage.getItem('warning')) {
      warningItem = JSON.parse(localStorage.getItem('warning'))
      console.log(warningItem[0].itemID)
      console.log(this.searchResultsData.itemID)
    }
    else {
      console.log('Warning not found.')
    }

    if (this.searchResultsData.itemID === warningItem[0].itemID) {
      console.log('the same values')
      this.ethyValue = localStorage.getItem('ethyVal')
      console.log(this.ethyValue)
      mockData  = m.genCarbonData(1300, 1500, 3)
      mockData2 = m.genCarbonData(2300, 2500, 7)
      mockDataFinal = [...mockData, ...mockData2]
    }
    else {
      mockData  = m.genCarbonData(1300, 1600, 10)
    }
    console.log('7&&&&&&&&&&&&&&&&&&&')
    console.log(mockData.map(e => {
      return e.Carbon
    }))

    this.carbonChart = new Chart('carbon', {
      type: 'line',
      data: {
        labels: [`${this.date.getHours()}:${this.date.getMinutes() + 1}` ,
                `${this.date.getHours()}:${this.date.getMinutes() + 2}`,
                `${this.date.getHours()}:${this.date.getMinutes() + 3}`,
                `${this.date.getHours()}:${this.date.getMinutes() + 4}`,
                `${this.date.getHours()}:${this.date.getMinutes() + 5}`,
                `${this.date.getHours()}:${this.date.getMinutes() + 6}`,
                `${this.date.getHours()}:${this.date.getMinutes() + 7}`,
                `${this.date.getHours()}:${this.date.getMinutes() + 8}`,
                `${this.date.getHours()}:${this.date.getMinutes() + 9}`,
                `${this.date.getHours()}:${this.date.getMinutes() + 10 }`],
        datasets: [{
          label: 'Carbon',
          data: mockDataFinal.map(e => {
            console.log(parseFloat(e.Carbon))

            return parseFloat(e.Carbon)
          }),
          borderColor: 'rgba(153,15,231,0.4)',
          fill: false
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

    //   // Moving Graph
    // setInterval(() => {
    //   this.carbonChart.data.datasets.forEach((dataset, index) => {
    //     const g = dataset.data.length
    //     this.carbonNeedleValue = dataset.data[g - 1]
    //     const metric = dataset.data.shift()
    //     dataset.data.push(metric + 1)
    //     this.carbonBottomLabel = `${dataset.data[g - 1]}`
    //   })
    //   this.carbonChart.update()
    // }, 4000)
    // })
  }

  loadEthyGraph(): void {
    let warningItem: any
    const m = new MockMonitor()
    let mockData = []
    let mockData2 = []
    let mockDataFinal = []

    if (localStorage.getItem('warning')) {
      warningItem = JSON.parse(localStorage.getItem('warning'))
      console.log(warningItem[0].itemID)
      console.log(this.searchResultsData.itemID)
    }
    else {
      console.log('Warning not found.')
    }

    if (this.searchResultsData.itemID === warningItem[0].itemID) {
      console.log('the same values')
      this.ethyValue = localStorage.getItem('ethyVal')
      console.log(this.ethyValue)
      mockData  = m.genEthyleneData(400, 600, 3)
      mockData2 = m.genEthyleneData(1300, 1500, 7)
      mockDataFinal = [...mockData, ...mockData2]
    }
    else {
      mockData  = m.genEthyleneData(400, 550, 10)
    }

    this.ethyleneChart = new Chart('ethylene', {
      type: 'line',
      data: {
        labels: [`${this.date.getHours()}:${this.date.getMinutes() + 1}` ,
        `${this.date.getHours()}:${this.date.getMinutes() + 2}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 3}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 4}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 5}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 6}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 7}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 8}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 9}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 10 }`],
        datasets: [{
          label: 'Ethylene',
          data: mockDataFinal.map(e => {
            return parseFloat(e.Ethylene)
          }),
          borderColor: '#FF0000',
          fill: false
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

 //     Moving Graph
    // setInterval(() => {
    //   this.ethyleneChart.data.datasets.forEach((dataset, index) => {
    //     const g = dataset.data.length
    //     this.ethyNeedleValue = dataset.data[g - 1]
    //     const metric = dataset.data.shift()
    //     dataset.data.push(metric + 1)
    //     this.ethyBottomLabel = `${dataset.data[g - 1]}`
    //   })
    //   this.ethyleneChart.update()
    // }, 4000)
    // })
  }

  loadTempGraph(): void {

    let warningItem: any
    const m = new MockMonitor()
    let mockData = []

    if (localStorage.getItem('warning')) {
      warningItem = JSON.parse(localStorage.getItem('warning'))
      console.log(warningItem[0].itemID)
      console.log(this.searchResultsData.itemID)
    }
    else {
      console.log('Warning not found.')
    }

    if (this.searchResultsData.itemID === warningItem[0].itemID) {
      console.log('the same values')
      this.ethyValue = localStorage.getItem('ethyVal')
      console.log(this.ethyValue)
      mockData  = m.genTempData()
    }
    else {
      mockData  = m.genTempData()
    }

    this.tempChart = new Chart('temperature', {
      type: 'line',

      data: {
        labels: [`${this.date.getHours()}:${this.date.getMinutes() + 1}` ,
        `${this.date.getHours()}:${this.date.getMinutes() + 2}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 3}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 4}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 5}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 6}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 7}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 8}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 9}`,
        `${this.date.getHours()}:${this.date.getMinutes() + 10 }`],
        datasets: [{
          label: 'Temperature',
          data: mockData.map(e => {

            return parseFloat(e.Temperature)
          }),
          borderColor: 'rgba(153,255,51,0.4)',
          fill: false
        },
        {
          label: 'Humidity',
          data: mockData.map(e => {
            return parseFloat(e.Humidity)
          }),
          borderColor: 'rgba(153,25,51,0.4)',
          fill: false
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
    // setInterval(() => {
    //   this.tempChart.data.datasets.forEach((dataset, index) => {
    //     // console.log(dataset)
    //     const g = dataset.data.length
    //     // console.log(dataset.data)
    //     this.tempNeedleValue = dataset.data[g - 1]
    //     const metric = dataset.data.shift()
    //     dataset.data.push(metric + 1)
    //     // this.ethyNeedleValue = metric + 1
    //     this.tempBottomLabel = `${dataset.data[g - 1]}`
    //   })
    //   this.ethyleneChart.update()
    // }, 4000)
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
    sendDate.endDate = this.getDays(1)[0]
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
}
