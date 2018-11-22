import { TokenService } from '../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { SendDate } from '../models'
import { environment } from '../../config'

@Injectable()
export class ReportService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    getEthyleneReport(): Observable<Object> {

        const gqlQuery = `
        {
                EthyleneCO2(
                  lt: 9999999999999
                  gt: 0,
                ){
                  avgEthylene,
                  avgCarbonDioxide,
                  avgTempIn,
                  avgHumidity
                  _id {
                    sku,
                    name
                  }
                }
              }
    `

        return this.http.post(`${environment.bhupeshURL}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getDonationReport(): Observable<Object> {

        const gqlQuery = `
        {
                Donate(
                  lt: 9999999999999
                  gt: 0,
                ){
                  avgTotal,
                  avgDonate,
                  _id {
                    sku,
                    name
                  }
                }
              }
    `

        return this.http.post(`${environment.bhupeshURL}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getFlashSaleReport(): Observable<Object> {

        const gqlQuery = `
        {
                FlashSale(
                  lt: 9999999999999
                  gt: 0,
                ){
                  avgTotal,
                  avgSold,
                  avgFlashSold,
                  _id {
                    sku,
                    name
                  }
                }
              }
    `

        return this.http.post(`${environment.bhupeshURL}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getInventoryReport(): Observable<Object> {

        const gqlQuery = `
        {
                ItemSold(
                  lt: 9999999999999
                  gt: 0,
                ){
                  avgTotal,
                  avgSold,
                  _id {
                    sku,
                    name
                  }
                }
              }
    `

        return this.http.post(`${environment.bhupeshURL}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getRevenueReport(): Observable<Object> {

        const gqlQuery = `
        {
            Revenue(
              lt: 9999999999999
              gt: 0,
            ){
              sku,
              name,
              prevSoldWeight,
              soldWeight,
              revenuePrev,
              revenueCurr,
              revenuePercent
            }
          }
    `

        return this.http.post(`${environment.bhupeshURL}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getSavingsReport(): Observable<Object> {

        const gqlQuery = `
        {
            Savings(
              lt: 9999999999999
              gt: 0,
            ){
                sku,
                name,
                wasteWeight,
                prevWasteWeight,
                amWastePrev,
                amWasteCurr,
                savingsPercent
            }
          }
    `

        return this.http.post(`${environment.bhupeshURL}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getWasteReport(): Observable<Object> {

        const gqlQuery = `
        {
                Waste(
                  lt: 9999999999999
                  gt: 0,
                ){
                  avgTotal,
                  avgWaste,
                  _id {
                    sku,
                    name
                  }
                }
              }
    `

        return this.http.post(`${environment.bhupeshURL}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

}
