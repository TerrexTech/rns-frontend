import 'chartjs-plugin-streaming'

import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Chart } from 'chart.js'
import { setInterval } from 'timers'

import { MonitorSearchComponent } from '../../search/monitor-search/monitor-search.component'
import { MockMonitor } from '../mocks-monitor'
import { CarbonService } from './carbon.service'
import { EthyleneService } from './ethylene.service'
import { TempService } from './temp.service'
import { HumidityService } from './humidity.service'

@Component({
  selector: 'component-carbon',
  templateUrl: './carbon.component.html',
  styleUrls: ['./carbon.component.css']
})
export class CarbonComponent implements OnInit {

  ethyleneChart: any
  carbonChart: any
  tempChart: any
  humidChart: any
  fruitName: string
  sku: string
  lot: string
  searchResultsData: any
  date: Date = new Date()

  carbonValue: string
  ethyleneValue: string
  tempValue: string
  humidityValue: string

  constructor(private carbonSvc: CarbonService,
              private ethyleneSvc: EthyleneService,
              private tempSvc: TempService,
              private humidSvc: HumidityService,
              private dialog: MatDialog) {
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
        // if (data) {
        // console.log(data)
        // console.log(data.data.InventoryQueryItem)
        // this.searchResultsData = data.data.InventoryQueryItem[0]
        // this.fruitName = this.searchResultsData.name
        // this.sku = this.searchResultsData.sku
        // this.lot = this.searchResultsData.lot
        this.loadCarbonGraph()
        this.loadEthyGraph()
        this.loadTempGraph()
        this.loadHumidGraph()

        this.carbonSvc.setOffset(1000)
        this.ethyleneSvc.setOffset(1000)
        // }
        // else {
        //   swal('Search data not provided')
        //       .catch(err => console.log(err))
        // }
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
    this.carbonChart = new Chart('carbon', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Carbon Dioxide',
          borderColor: 'rgba(153,15,231,0.4)',
          fill: false,
          lineTension: 0
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Period'
            },
            type: 'realtime',
            time: {
              displayFormats: {
                millisecond: 'HH:MMa',
                second: 'HH:MMa',
                minute: 'HH:MMa',
                hour: 'HH:MMa',
                day: 'HH:MMa',
                week: 'HH:MMa',
                month: 'HH:MMa',
                quarter: 'HH:MMa',
                year: 'HH:MMa'
              }
            },
            realtime: {
              duration: 20000,
              delay: 2000,
              pause: false,
              ttl: undefined
            },
            ticks: {
              source: 'data'
            }
          }],

          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'PPM'
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        }
      }
    })

    this.carbonSvc.getDataSource()
                  .subscribe(v => {
      if (!v) {
        return
      }
      this.carbonChart.data.datasets[0].data.push({
        x: v.time,
        y: v.value.toFixed(2)
      })
      this.carbonChart.update({
        preservation: true
      })
      this.carbonValue = v.value.toFixed(2)
    })
    this.carbonSvc.startMocking(1300, 1600)
  }

  loadEthyGraph(): void {

    this.ethyleneChart = new Chart('ethylene', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Ethylene',
          borderColor: 'rgba(153,55,55,0.4)',
          fill: false,
          lineTension: 0
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Period'
            },
            type: 'realtime',
            time: {
              displayFormats: {
                millisecond: 'HH:MMa',
                second: 'HH:MMa',
                minute: 'HH:MMa',
                hour: 'HH:MMa',
                day: 'HH:MMa',
                week: 'HH:MMa',
                month: 'HH:MMa',
                quarter: 'HH:MMa',
                year: 'HH:MMa'
              }
            },
            realtime: {
              duration: 20000,
              delay: 2000,
              pause: false,
              ttl: undefined
            },
            ticks: {
              source: 'data'
            }
          }],

          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'PPM'
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        }
      }
    })

    this.ethyleneSvc.getDataSource()
                  .subscribe(v => {
      if (!v) {
        return
      }
      this.ethyleneChart.data.datasets[0].data.push({
        x: v.time,
        y: v.value.toFixed(2)
      })
      this.ethyleneChart.update({
        preservation: true
      })
      this.ethyleneValue = v.value.toFixed(2)
    })
    this.ethyleneSvc.startMocking(400, 700)
  }

  loadTempGraph(): void {

    this.tempChart = new Chart('temperature', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Temperature',
          borderColor: 'rgba(153,555,55,0.4)',
          fill: false,
          lineTension: 0
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Period'
            },
            type: 'realtime',
            time: {
              displayFormats: {
                millisecond: 'HH:MMa',
                second: 'HH:MMa',
                minute: 'HH:MMa',
                hour: 'HH:MMa',
                day: 'HH:MMa',
                week: 'HH:MMa',
                month: 'HH:MMa',
                quarter: 'HH:MMa',
                year: 'HH:MMa'
              }
            },
            realtime: {
              duration: 20000,
              delay: 2000,
              pause: false,
              ttl: undefined
            },
            ticks: {
              source: 'data'
            }
          }],

          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Degrees (C)'
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        }
      }
    })

    this.tempSvc.getDataSource()
                  .subscribe(v => {
      if (!v) {
        return
      }
      this.tempChart.data.datasets[0].data.push({
        x: v.time,
        y: v.value.toFixed(2)
      })
      this.tempChart.update({
        preservation: true
      })
      this.tempValue = v.value.toFixed(2)
    })
    this.tempSvc.startMocking(23, 27)
  }

  loadHumidGraph(): void {

    this.humidChart = new Chart('humidity', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Humidity %',
          borderColor: 'rgba(153,55,45,0.4)',
          fill: false,
          lineTension: 0
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Period'
            },
            type: 'realtime',
            time: {
              displayFormats: {
                millisecond: 'HH:MMa',
                second: 'HH:MMa',
                minute: 'HH:MMa',
                hour: 'HH:MMa',
                day: 'HH:MMa',
                week: 'HH:MMa',
                month: 'HH:MMa',
                quarter: 'HH:MMa',
                year: 'HH:MMa'
              }
            },
            realtime: {
              duration: 20000,
              delay: 2000,
              pause: false,
              ttl: undefined
            },
            ticks: {
              source: 'data'
            }
          }],

          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'PPM'
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        }
      }
    })

    this.humidSvc.getDataSource()
                  .subscribe(v => {
      if (!v) {
        return
      }
      this.humidChart.data.datasets[0].data.push({
        x: v.time,
        y: v.value.toFixed(2)
      })
      this.humidChart.update({
        preservation: true
      })
      this.humidityValue = v.value.toFixed(2)
    })
    this.humidSvc.startMocking(60,  76)
  }
}
