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

    public search(searchQuery, pageName): Observable<Object> {
        console.log(searchQuery)
        console.log(pageName)
        let returnItems = []
        let query = ''
        switch (pageName) {
            case 'inventoryPage':
                query = 'InventoryQueryItem'
                returnItems = [`itemID,dateArrived,dateSold,deviceID,
                              donateWeight,lot,name,origin,price,rsCustomerID,sku,soldWeight,
                              timestamp,totalWeight,upc,wasteWeight`]
                break
            case 'disposePage':
                query = 'InventoryQueryItem'
                returnItems = [`itemID,
                              lot,name,sku, wasteWeight, soldWeight, totalWeight
                              timestamp`]
                break
            case 'donatePage':
                query = 'InventoryQueryItem'
                returnItems = [`itemID,
                              lot,name,sku,donateWeight, soldWeight, totalWeight
                              timestamp`]
                break
            case 'sale':
                query = 'InventoryQueryItem'
                break
            case 'flashHistory':
                query = 'FlashsaleQueryItem'
                returnItems = [`itemID,
                              lot,name,sku,soldWeight,
                              timestamp,totalWeight, onFlashsale`]
                break
            case 'device':
                query = 'DeviceQueryItem'
                returnItems = [`itemID,
                              deviceID,dateInstalled,lot,lastMaintenance,
                              name,status, sku`]
                break
            case 'flashsale':
                query = 'InventoryQueryItem'
                returnItems = [`itemID, lot, soldWeight, totalWeight,
                              name,sku, projectedDate, timestamp`]
                break
            default:
                query = 'InventoryQueryItem'
                break
        }

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
        ${query}(
            ${sku}
            ${name}
            ${lot}
        ){
            ${returnItems}
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

    public searchTime(searchQuery, pageName): Observable<Object> {
        console.log(searchQuery)

        let query = ''
        switch (pageName) {
            case 'inventoryPage':
                query = 'InventoryQueryTimestamp'
                break
            case 'disposePage':
                query = 'DisposalQueryTimestamp'
                break
            case 'donatePage':
                query = 'DonationQueryTimestamp'
                break
            case 'sale':
                query = 'InventoryQueryTimestamp'
                break
            case 'flashHistory':
                query = 'FlashsaleQueryTimestamp'
                break
            case 'device':
                query = 'DeviceQueryTimestamp'
                break
            default:
                query = 'InventoryQueryItem'
                break
        }

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
        ${query}(
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
