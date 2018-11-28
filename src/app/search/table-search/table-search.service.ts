import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '../../../config'

interface Query {
    sku: string
    name: string
    origin: string
    price: string
    lot: string
    start_date: number
    end_date: number
    exact_match: boolean
}

@Injectable()
export class TableSearchService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public search(searchQuery): Observable<Object> {
        console.log(searchQuery)

        let sku = ''
        let name = ''
        let lot = ''
        if (searchQuery.sku) {
            sku = `sku: "${searchQuery.sku}", `
        }
        if (searchQuery.name) {
            name = `name: "${searchQuery.name}", `
        }
        if (searchQuery.lot) {
            lot = `lot: "${searchQuery.lot}," `
        }
        const gqlQuery = `
    {
        InventoryQueryItem(
            ${sku}
            ${name}
            ${lot}
        ){
            itemID,
            dateArrived,
            dateSold,
            deviceID,
            donateWeight,
            lot,
            name,
            origin,
            price,
            rsCustomerID,
            sku,
            soldWeight,
            timestamp,
            totalWeight,
            upc,
            wasteWeight
        }
        }
    `
        console.log(gqlQuery)

        return this.http.post(`${environment.bhupeshIP}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public searchTime(searchQuery): Observable<Object> {
        console.log(searchQuery)

        let start = ''
        let end = ''
        let period = ''
        if (searchQuery.start_date) {
            start = `start: ${searchQuery.start_date}, `
        }
        if (searchQuery.end_date) {
            end = `end: ${searchQuery.end_date},`
        }
        if (searchQuery.period) {
            period = `period: ${searchQuery.period}, `
        }

        const gqlQuery = `
    {
        InventoryQueryTimestamp(
            ${start}
            ${end}
            ${period}
            count: 30
        ){
            itemID,
            dateArrived,
            dateSold,
            deviceID,
            donateWeight,
            lot,
            name,
            origin,
            price,
            rsCustomerID,
            sku,
            soldWeight,
            timestamp,
            totalWeight,
            upc,
            wasteWeight
        }
        }
    `
        console.log(gqlQuery)

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
