import { Component, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { MockMonitor } from '../mocksMonitor'

@Component({
  selector: 'component-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  readings: any = []
  carbon: any
  ethylene: any
  sensor: any
  temperature: any
  humidity: any

  constructor() { }

  ngOnInit(): void {
    // this.getData()
    setInterval(() => {
      this.fakeData()
    }, 1000)
  }

  fakeData(): void {
    const mockData = new MockMonitor()
    this.carbon = mockData.genFloat(100, 200)
                          .toFixed(2)
    this.ethylene = mockData.genFloat(100, 200)
                            .toFixed(2)
    this.temperature = mockData.genFloat(100, 200)
                               .toFixed(2)
    this.sensor = 20
  }

  // public getJSON(): any {

  //   let date = []
  //   const sendDate = new SendDate()
  //   sendDate.end_date = this.getDays(2)[0]
  //   date = [{ end_date: sendDate.end_date }]
  //   console.log('}}}}}}}}}}}}}}}}}}}}')
  //   console.log(date)

  //   return this.http.post(`environment.apiUrl + '/load-table'`, date, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  // }

  getData(): void {
    // this.getJSON()
    //   .subscribe(data => {
    //     console.log(data)
    //    console.log(data)
    //   })

  }

}
