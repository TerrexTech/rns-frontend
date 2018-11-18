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

    getEthyleneReport(data): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getFlashSaleReport(data): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getInventoryReport(data): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getRevenueReport(data): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getSavingsReport(data): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getSensorReport(data): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getTempReport(data): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getWasteReport(data): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

}
