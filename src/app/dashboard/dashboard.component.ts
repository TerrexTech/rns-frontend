import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import Chart from 'chart.js'
import { InventoryService } from '../inventory/inventory.service'
import { ReportService } from '../reports/reports.service'
import addHours from 'date-fns/add_hours'

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
  totalWeight: number
  soldWeight: number
  wasteWeight: number
  prodSold: any

  @ViewChild('arrival') arrival: ElementRef
  @ViewChild('total') total: ElementRef
  @ViewChild('average') average: ElementRef

  constructor(public invServ: InventoryService,
              public repServ: ReportService
             ) { }

  ngOnInit(): void {

    this.prodSold = localStorage.getItem('soldWeight')

    this.date.setUTCHours(0, 0, 0, 0)
    const today = (this.date.getTime() / 1000).toFixed(0)
    this.invServ.getTable()
      .toPromise()
      .then((data: any) => {
        console.log(data)
        if (data.data.InventoryQueryCount) {
          console.log(data.data.InventoryQueryCount)
          const invArray = data.data.InventoryQueryCount
          this.totalWeight = 0
          this.soldWeight = 0
          this.wasteWeight = 0
          data.data.InventoryQueryCount.forEach(total => {
            if (total.timestamp <= today) {
              this.totalWeight += Math.round(total.totalWeight)
              this.soldWeight += Math.round(total.soldWeight)
              this.wasteWeight += Math.round(total.wasteWeight)
            }
          })
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
  }

  loadSoldGraph(): void {
    const d = new Date()
    const d5 = addHours(d, -5)
    const d4 = addHours(d, -4)
    const d3 = addHours(d, -3)
    const d2 = addHours(d, -2)
    const d1 = addHours(d, -1)
    this.soldChart = new Chart('soldChart', {
      type: 'line',
      data: {
        labels: [`${d5.getHours()}:${d.getMinutes()}`,
        `${d4.getHours()}:${d.getMinutes()}`,
        `${d3.getHours()}:${d.getMinutes()}`,
        `${d2.getHours()}:${d.getMinutes()}`,
        `${d1.getHours()}:${d.getMinutes()}`
        ],
        datasets: [{
          fill: false,
          label: 'Sold',
          data: [this.soldWeight / 56,
                 this.soldWeight / 54,
                 this.soldWeight / 52,
                 this.soldWeight / 50,
                 this.prodSold
                ],
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
  }

  loadDistNew(): void {
    let distArray = []
    this.repServ.getInventoryReport()
      .toPromise()
      .then((data: any) => {
        distArray = data.data.ItemSold
        console.log('distArray')
        console.log(distArray)

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
          }
        })
      })
      .catch()
  }

  loadDonationGraph(): void {
    let donateArray = []

    this.repServ.getDonationReport()
                .toPromise()
                .then((data: any) => {
                    donateArray = data.data.Donate
                    console.log(donateArray)

                    console.log('7&&&&&&&&&&&&&&&&&&&')
                    this.donationChart = new Chart('donationChart', {
                      type: 'polarArea',
                      data: {
                        labels: donateArray.map(e => {
                          return e._id.name
                        }),
                        datasets: [
                          {
                            label: 'Donated',
                            data: donateArray.map(e => {
                              return e.avgDonate
                            }),
                            backgroundColor: ['#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', '#FFCC00',
                            '##FFAC00', '#FF0000', '#FF4136', '#FF851B', '#5F523B', '#3D56', '#000']
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
        )
        .catch(console.log)
      }
}
