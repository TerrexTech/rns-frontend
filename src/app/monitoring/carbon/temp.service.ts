import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import parse from 'date-fns/parse'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { Observable } from 'rxjs/Observable'

import { TokenService } from '../../_Auth/token.service'
import { MockUtils } from '../../inventory/add/mockutils'
import { SendDate } from '../../models'
import { environment } from '../../../config'

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
export class TempService {

  private dataSubject = new BehaviorSubject<Metric>(undefined)
  private deviceObjSource = this.dataSubject.asObservable()
  private offset = 0
  private isMocking = true

  constructor(private http: HttpClient, private jwt: TokenService) {
  }

  startMocking = (min, max): void => {
    this.isMocking = true

    const mu = new MockUtils()
    const maxDeviation = 3
    let value = mu.genFloat(min, max)

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
