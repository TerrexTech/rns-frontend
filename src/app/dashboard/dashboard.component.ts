import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../config'
import { SendDate } from '../models'
import Chart from 'chart.js'
import { AlertService } from '../alert-popup/alert.service'
import { DashboardService } from './dashboard.service'
import { MockUtils } from './mockutils'
import { InventoryService } from '../inventory/inventory.service'
import { ReportService } from '../reports/reports.service'

@Component({
  selector: 'component-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  totalChart: any
  soldChart: any
  distChart: any
  donationChart: any
  date: Date = new Date()
  combinationGraph = []
  totalWeight: number
  soldWeight: number
  wasteWeight: number

  @ViewChild('arrival') arrival: ElementRef
  @ViewChild('total') total: ElementRef
  @ViewChild('average') average: ElementRef

  constructor(private http: HttpClient, private alertService: AlertService, private dashServ: DashboardService,
              public invServ: InventoryService, public repServ: ReportService) { }

  ngOnInit(): void {
    this.date.setUTCHours(0, 0, 0, 0)
    const today = (this.date.getTime() / 1000).toFixed(0)
    this.invServ.getTable()
      .toPromise()
      .then((data: any) => {
        if (data.data.InventoryQueryCount) {
          console.log(data.data.InventoryQueryCount)
          const invArray = data.data.InventoryQueryCount
          this.totalWeight = 0
          this.soldWeight = 0
          this.wasteWeight = 0
          data.data.InventoryQueryCount.forEach(total => {
            if (total.timestamp >= today) {
              this.totalWeight += total.totalWeight
              this.soldWeight += total.soldWeight
              this.wasteWeight += total.wasteWeight
            }
          })
          console.log(this.totalWeight)
          this.loadTotalNew()
          this.loadSoldGraph()
          this.loadDistNew()
          this.loadDonationGraph()
        }
        else {
          alert('Timed out.')
        }
      }
      )
      .catch(() => console.log('Timed out.'))

  }

  changeAxis(dateArray: JSON): JSON {
    return dateArray
  }

  loadTotalNew(): void {
    // this.openSearch()
    const m = new MockUtils()
    m.genTotalGraph()
    console.log('7&&&&&&&&&&&&&&&&&&&')
    const arr1 = JSON.parse(localStorage.getItem('total'))
    const dateLabel = new Date()
    this.totalChart = new Chart('totalChart', {
      type: 'bar',
      data: {
        labels: [dateLabel.toLocaleString()
          .split(',')[0]],
        datasets: [
          {
            label: 'Total Weight',
            data: [this.totalWeight.toFixed(0)],
            backgroundColor: 'rgba(255, 99, 132, 1)'
          },
          {
            label: 'Sold Weight',
            data: [this.soldWeight.toFixed(0)],
            backgroundColor: 'rgba(25, 99, 132, 1)'
          },
          {
            label: 'Waste Weight',
            data: [this.wasteWeight],
            backgroundColor: 'rgba(125, 30, 255, 1)'
          }
        ]
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
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Weight(Kg)'
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
    // this.totalChart.data.datasets.forEach((dataset, index) => {
    // console.log(dataset)
    // const g = dataset.data.length
    // console.log(dataset.data)
    // const metric = dataset.data.shift()
    // dataset.data.push(metric + 1)
    // this.ethyNeedleValue = metric + 1
    // })
    // this.totalChart.update()
    // }, 1200)
    // })
  }

  loadTotalGraph(): void {
    this.totalChart = new Chart('totalChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Total Weight',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 1)'
          },
          {
            label: 'Sold Weight',
            data: [],
            backgroundColor: 'rgba(25, 99, 132, 1)'
          },
          {
            label: 'Waste Weight',
            data: [],
            backgroundColor: 'rgba(125, 30, 255, 1)'
          }
        ]
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
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Weight(Kg)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    this.dashServ.getTotal()
      .toPromise()
      .then(dataArr => {
        console.log(dataArr)
        const metrics: any = [
          [],
          [],
          []
        ]
        // total_weight: 195, sold_weight: 58, waste_weight: 49
        Object.keys(dataArr)
          .forEach(k => {
            const weights = dataArr[k]
            const date = new Date(weights.dates * 1000).toDateString()
            this.totalChart.data.labels.push(date)
            this.total.nativeElement.innerHTML = weights.total_weight
            metrics[0].push(weights.total_weight)
            metrics[1].push(weights.sold_weight)
            metrics[2].push(weights.waste_weight)
          })

        this.totalChart.data.datasets.forEach((dataset, index) =>
          dataset.data = dataset.data.concat(metrics[index])
        )

        this.totalChart.update()
        // metrics[0].shift()
        // metrics[1].shift()

        // Moving Graph
      })
      .catch(console.log)

    setInterval(() => {
      this.dashServ.getToday()
        .toPromise()
        .then(newDate => {
          const newMetrics: any = [
            [],
            [],
            []
          ]
          console.log(newDate)
          Object.keys(newDate)
            .forEach(k => {
              console.log(k)
              const weights = newDate[k]
              const date = new Date(weights.dates * 1000).toDateString()
              this.totalChart.data.labels.push(date)
              this.total.nativeElement.innerHTML = weights.total_weight

              this.totalChart.data.datasets.forEach((dataset, index) => {
                console.log(index)
                const metric = dataset.data.shift()
                dataset.data.push(newMetrics[index])
                console.log(dataset)

                newMetrics[0].push(weights.total_weight)
                newMetrics[1].push(weights.sold_weight)
                newMetrics[2].push(weights.waste_weight)
              })
              this.totalChart.update()
            })

        })

    }, 1200000)
  }

  loadSoldGraph(): void {
    const m = new MockUtils()
    m.genSoldGraph()
    const d = new Date()
    console.log('7&&&&&&&&&&&&&&&&&&&')
    const arr1 = JSON.parse(localStorage.getItem('sold'))
    this.soldChart = new Chart('soldChart', {
      type: 'line',
      data: {
        labels: [`${(d.getHours() - 5) - 12}:${d.getMinutes()}`,
        `${(d.getHours() - 4) - 12}:${d.getMinutes()}`,
        `${(d.getHours() - 3) - 12}:${d.getMinutes()}`,
        `${(d.getHours() - 2) - 12}:${d.getMinutes()}`,
        `${(d.getHours() - 1) - 12}:${d.getMinutes()}`
        ],
        datasets: [{
          fill: false,
          label: 'Sold',
          data: [this.soldWeight / 1.4, this.soldWeight / 1.3, this.soldWeight / 1.2, this.soldWeight / 1, this.soldWeight],
          borderColor: '#FF0000'
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
              labelString: 'Weight (Kg)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    // Moving Graph
    setInterval(() => {
      this.soldChart.data.datasets.forEach((dataset, index) => {
        const metric = dataset.data.shift()
        dataset.data.push(metric + 1)
      })
      this.soldChart.update()
    }, 1200000)
  }

  loadDistGraph(): void {

    this.distChart = new Chart('distChart', {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            label: [''],
            data: [],
            backgroundColor: ['#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', '#FFCC00', '##FFAC00', '#FF0000', '#FF4136', '#FF851B'],
            fill: 'true'
          }
        ]
      },
      options: {
        responsive: true,
        hover: {
          mode: 'dataset'
        },
        legend: {
          display: true
        }
      }
    })
    // total_weight: 195, sold_weight: 58, waste_weight: 49
    // Object.keys(dataArr)
    //   .forEach(k => {
    //     const prods = dataArr[k]
    //     // const date = new Date(prods.dates).toDateString()
    //     this.distChart.data.labels.push(prods.prod_name)
    //     metrics[0].push(prods.prod_weight)
    //   })

    // this.distChart.data.datasets.forEach((dataset, index) =>
    //   dataset.data = dataset.data.concat(metrics[index])
    // )
    // this.distChart.update()

    // Moving Graph
    // setInterval(() => {
    //   this.distChart.data.datasets.forEach((dataset, index) => {
    //     const metric = dataset.data.shift()
    //     dataset.data.push(metric + 1)
    //   })
    //   this.distChart.update()
    // }, 5000)
  }

  loadDistNew(): void {
    // const m = new MockUtils()
    // m.genDistGraph()

    let distArray = []

    this.repServ.getInventoryReport()
      .toPromise()
      .then((data: any) => {
        distArray = data.data.ItemSold
        console.log(distArray)

        console.log('7&&&&&&&&&&&&&&&&&&&')
        const arr1 = JSON.parse(localStorage.getItem('dist'))
        this.distChart = new Chart('distChart', {
          type: 'pie',
          data: {
            labels: distArray.map(e => {
              return e._id.name
            }),
            datasets: [
              {
                label: 'Fruit',
                data: distArray.map(e => {
                  return parseFloat(e.avgTotal)
                }),
                backgroundColor: ['#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', '#FFCC00',
                  '##FFAC00', '#FF0000', '#FF4136', '#FF851B', '#5F523B', '#3D56', '#000'],
                fill: 'true'
              }
            ]
          },
          options: {
            responsive: true,
            hover: {
              mode: 'dataset'
            },
            legend: {
              display: true
            }
            // scales: {
            //   xAxes: [{
            //     display: true,
            //     scaleLabel: {
            //       display: true,
            //       labelString: 'Date'
            //     }
            //   }],
            //   yAxes: [{
            //     display: true,
            //     scaleLabel: {
            //       display: true,
            //       labelString: 'Weight'
            //     },
            //     ticks: {
            //       beginAtZero: true
            //     }
            //   }]
            // }
          }
        })
      })
      .catch()
  }

  loadDonationGraph(): void {
    const m = new MockUtils()
    m.genDonateGraph()
    console.log('7&&&&&&&&&&&&&&&&&&&')
    const arr1 = JSON.parse(localStorage.getItem('donate'))
    this.donationChart = new Chart('donationChart', {
      type: 'bar',
      data: {
        labels: arr1.map(e => {
          return e.Name
        }),
        datasets: [
          {
            label: 'Average Products',
            data: arr1.map(e => {
              return e.Donated
            }),
            backgroundColor: 'rgba(255, 99, 132, 1)'
          }
        ]
      },
      options: {
        responsive: true,
        hover: {
          mode: 'dataset'
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Fruit'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Weight (Kg)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    // Moving Graph
    setInterval(() => {
      this.donationChart.data.datasets.forEach((dataset, index) => {
        const metric = dataset.data.shift()
        dataset.data.push(metric + 1)
      })
      this.donationChart.update()
    }, 1200000)
  }

  // success(message: string): void {
  //   this.alertService.success(message)
  // }

  // error(message: string): void {
  //     this.alertService.error(message)
  // }

  // info(message: string): void {
  //     this.alertService.info(message)
  // }

  // warn(message: string): void {
  //     this.alertService.warn(message)
  // }

  // clear(): void {
  //     this.alertService.clear()
  // }
}
