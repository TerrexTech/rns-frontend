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
  date: Date = new Date()

  carbonValue = 2200
  ethyValue = 28.2
  tempValue = 28.3

  constructor(private http: HttpClient,  private dialog: MatDialog) {
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
      if (data) {
      console.log(data)
      console.log(data.data.InventoryQueryItem)
      this.searchResultsData = data.data.InventoryQueryItem[0]
      this.fruitName = this.searchResultsData.name
      this.sku = this.searchResultsData.sku
      this.lot = this.searchResultsData.lot
      this.loadCarbonGraph()
      this.loadEthyGraph()
      this.loadTempGraph()
      }
      else {
        swal('Search data not provided')
            .catch(err => console.log(err))
      }
    })
  }

  carbonColorChange(metricValue: number): string {
    let colorString = ''
    if (metricValue >= 2200) {

      return colorString = 'warning'
    }
    else {

      return colorString = ''
    }
  }

  ethyleneColorChange(metricValue: number): string {
    let colorString = ''
    if (metricValue >= 1200) {

      return colorString = 'warning'
    }
    else {

      return colorString = ''
    }
  }

  loadCarbonGraph(): void {
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
      console.log(this.ethyValue)
      mockData  = m.genCarbonData(1300, 1500, 3)
      mockData2 = m.genCarbonData(2300, 2500, 7)
      mockDataFinal = [...mockData, ...mockData2]
    }
    else {
      mockData = m.genCarbonData(1300, 1600, 10)
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
    setInterval(() => {
      this.carbonValue = Number(m.genFloat(2300, 2500)
                                  .toFixed(0))
    //   this.carbonChart.data.datasets.forEach((dataset, index) => {
    //     const g = dataset.data.length
    //     this.carbonNeedleValue = dataset.data[g - 1]
    //     const metric = dataset.data.shift()
    //     dataset.data.push(metric + 1)
    //     this.carbonBottomLabel = `${dataset.data[g - 1]}`
    //   })
    //   this.carbonChart.update()
    }, 1000)
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
    console.log(this.ethyleneChart.data.datasets[0].data.push(10))

 //     Moving Graph
    setInterval(() => {
    this.ethyValue = Number(m.genFloat(1300, 1600)
                              .toFixed(0))
  // //   // this.ethyleneChart.data.datasets.forEach((dataset, index) => {
  //  this.ethyleneChart.data.datasets[0].data.shift()
  //  //  console.log(metric)
  //  this.ethyleneChart.data.datasets[0].data.push(m.genEthyleneData(1300, 1600, 10)
  //                                                 .map(e => parseFloat(e.Ethylene)))
  // //   // })
  //  this.ethyleneChart.update()
    }, 1000)
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
              labelString: '°C'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
}
