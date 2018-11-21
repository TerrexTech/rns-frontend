import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../config'
import { SendDate } from '../../models'
import { Chart } from 'chart.js'
import { MockMonitor } from '../mocks-monitor'
import { MatDialog } from '@angular/material'
import { MonitorSearchComponent } from '../../search/monitor-search/monitor-search.component'

interface Monitoring {
  sku: string
  name: string
  lot: string
}

let searchData: Monitoring[] = []

@Component({
  selector: 'component-carbon',
  templateUrl: './carbon.component.html',
  styleUrls: ['./carbon.component.css']
})
export class CarbonComponent implements OnInit {
  ethyleneChart: any
  carbonChart: any
  tempChart: any
  fruitName = 'Apple'
  sku = 'Apple'
  lot = 'Apple'

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
    this.loadCarbonGraph()
    this.loadEthyGraph()
    this.loadTempGraph()
  }

  openSearch(): any {
    this.dialog.open(MonitorSearchComponent, {
      width: '500px',
      disableClose: true
    })
      .afterClosed()
      .subscribe(
        data => searchData = data
      )

    return searchData
  }

  loadCarbonGraph(): void {
    // this.openSearch()
    const m = new MockMonitor()
    m.genCarbonData()
    console.log('7&&&&&&&&&&&&&&&&&&&')
    const arr1 = JSON.parse(localStorage.getItem('carbon'))
   // const arr1 = this.openSearch()
    console.log(arr1.map(e => {
      return e.Carbon
    }))
    // console.log(mock.genFloat(30, 90))
    // this.ethyData = mock.genFloat(30, 90)
    // this.dataSource.data = this.ethyData
    this.carbonChart = new Chart('carbon', {
      type: 'line',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'Carbon',
          data: arr1.map(e => {
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
    setInterval(() => {
      this.carbonChart.data.datasets.forEach((dataset, index) => {
        // console.log(dataset)
        const g = dataset.data.length
        // console.log(dataset.data)
        this.carbonNeedleValue = dataset.data[g - 1]
        const metric = dataset.data.shift()
        dataset.data.push(metric + 1)
        // this.ethyNeedleValue = metric + 1
        this.carbonBottomLabel = `${dataset.data[g - 1]}`
      })
      this.ethyleneChart.update()
    }, 4000)
    // })
  }

  loadEthyGraph(): void {
    const m = new MockMonitor()
    m.genEthyleneData()
    console.log('7&&&&&&&&&&&&&&&&&&&')
    const arr1 = JSON.parse(localStorage.getItem('ethylene'))
    console.log(arr1.map(e => {
      return e.Ethylene
    }))
    // console.log(mock.genFloat(30, 90))
    // this.ethyData = mock.genFloat(30, 90)
    // this.dataSource.data = this.ethyData
    this.ethyleneChart = new Chart('ethylene', {
      type: 'line',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'Ethylene',
          data: arr1.map(e => {
            console.log(parseFloat(e.Ethylene))

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

 //     Moving Graph
    setInterval(() => {
      this.ethyleneChart.data.datasets.forEach((dataset, index) => {
        // console.log(dataset)
        const g = dataset.data.length
        // console.log(dataset.data)
        this.ethyNeedleValue = dataset.data[g - 1]
        const metric = dataset.data.shift()
        dataset.data.push(metric + 1)
        // this.ethyNeedleValue = metric + 1
        this.ethyBottomLabel = `${dataset.data[g - 1]}`
      })
      this.ethyleneChart.update()
    }, 4000)
    // })
  }

  loadTempGraph(): void {
    const m = new MockMonitor()
    m.genTempData()
    console.log('7&&&&&&&&&&&&&&&&&&&')
    const arr1 = JSON.parse(localStorage.getItem('temp'))
    console.log(arr1.map(e => {
      return e
    }))
    // console.log(mock.genFloat(30, 90))
    // this.ethyData = mock.genFloat(30, 90)
    // this.dataSource.data = this.ethyData
    this.tempChart = new Chart('temperature', {
      type: 'line',

      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'Temperature',
          data: arr1.map(e => {
            console.log(parseFloat(e.Temperature))

            return parseFloat(e.Temperature)
          }),
          borderColor: 'rgba(153,255,51,0.4)',
          fill: false
        },
        {
          label: 'Humidity',
          data: arr1.map(e => {
            console.log(parseFloat(e.Humidity))

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
