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

    getDonationReport(): Observable<Object> {

        const gqlQuery = `
        {
            Donate(
              lt: 1542647468
              gt: 0,
            ){
              avg_total,
              _id {
                sku,
                name
              }
            }
          }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getFlashSaleReport(): Observable<Object> {

        const gqlQuery = `
        {
            Flashsale(
              lt: 9999999999999
              gt: 0,
            ){
              avg_total,
              _id {
                sku,
                name
              }
            }
          }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getInventoryReport(): Observable<Object> {

        const gqlQuery = `
        {
            Inventory(
              lt: 9999999999999
              gt: 0,
            ){
              avg_total,
              _id {
                sku,
                name
              }
            }
          }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
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
              avg_total,
              _id {
                sku,
                name
              }
            }
          }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
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
              avg_total,
              _id {
                sku,
                name
              }
            }
          }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getSensorReport(): Observable<Object> {

        const gqlQuery = `
        {
            Sensor(
              lt: 9999999999999
              gt: 0,
            ){
              avg_total,
              _id {
                sku,
                name
              }
            }
          }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getTempReport(): Observable<Object> {

        const gqlQuery = `
        {
            Temperature(
              lt: 9999999999999
              gt: 0,
            ){
              avg_total,
              _id {
                sku,
                name
              }
            }
          }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
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
              avg_total,
              _id {
                sku,
                name
              }
            }
          }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

}
