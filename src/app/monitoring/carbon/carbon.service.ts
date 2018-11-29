import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import parse from 'date-fns/parse'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { Observable } from 'rxjs/Observable'

import { TokenService } from '../../_Auth/token.service'
import { MockUtils } from '../../inventory/add/mockutils'
import { SendDate } from '../../models'

interface Monitoring {
  sku: string
  name: string
  lot: string
}

interface Metric {
  time: Date
  value: number
}

@Injectable()
export class CarbonService {

  private dataSubject = new BehaviorSubject<Metric>(undefined)
  private deviceObjSource = this.dataSubject.asObservable()
  private offset = 0
  private isMocking = true

  constructor(private http: HttpClient, private jwt: TokenService) {
  }

  getDays(days?: number): any[] {
    let dates = []
    const end_date = Math.round((new Date().getTime() / 1000) + (days * 86400))
    const start_date = Math.round(new Date().getTime() / 1000) - (days * 86400)

    return dates = [
      end_date, start_date
    ]
  }
  getToday(): any {
    let sendDates = []

    const sendDate = new SendDate()
    sendDate.endDate = this.getDays(1)[0]
    // sendDate.start_date = this.getDays(0)[1]
    console.log(sendDate)
    sendDates = [sendDate]

    const gqlQuery = `
    mutation{
      addInventory(
        end_date: '${sendDate.endDate}'
        ){accessToken, refreshToken}
    }
    `

    return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
      headers: {
        'Content-Type': 'application/text'
      }
    })
  }

  getData(data: Monitoring): Observable<Object> {

    const gqlQuery = `
      mutation{
        addInventory(
          sku: '${data.sku}',
          name: '${data.name}',
          lot: '${data.lot}'
        ){accessToken, refreshToken}
      }
      `

    return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
      headers: {
        'Content-Type': 'application/text'
      }
    })
  }

  startMocking = (): void => {
    this.isMocking = true

    const mu = new MockUtils()
    const maxDeviation = 3
    let value = mu.genFloat(1300, 1600)

    setInterval(() => {
      if (!this.isMocking) {
        return
      }
      const deviation = mu.genFloat(-maxDeviation / 2, maxDeviation / 2)
      this.addData({
        time: parse(Date.now()),
        value
      })
      value += deviation
    }, 1000)
  }

  stopMocking = (): void => {
    this.isMocking = false
  }

  addData = (data: Metric): void => {
    data.value += this.offset
    this.dataSubject.next(data)
  }

  getDataSource = (): Observable<Metric> => {
    return this.deviceObjSource
  }

  setOffset = (offset: number): void => {
    this.offset = offset
  }
}
