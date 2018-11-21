import { TokenService } from '../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '../../config'
import { uuid } from 'uuid'

@Injectable()
export class InventoryService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public addItem(data): Observable<Object> {

        const date = new Date().getTime() / 1000
        const gqlQuery = `
        mutation{
        InventoryInsert(
            itemID: "${data.item_id}",
            dateArrived: ${data.date_arrived},
            deviceID: "${data.device_id}",
            donateWeight: 0,
            lot: "${data.lot}",
            name: "${data.name}",
            origin: "${data.origin}",
            price: ${data.price},
            rsCustomerID: "${this.jwt.getAccessToken().sub}",
            salePrice: 0,
            sku: "${data.sku}",
            soldWeight: 0,
            timestamp: ${Math.floor(date)},
            totalWeight: ${data.total_weight},
            upc: "${54754}",
            wasteWeight: 0
        ){
        _id,
        itemID,
        dateArrived,
        deviceID,
        donateWeight,
        lot,
        name,
        origin,
        price,
        rsCustomerID,
        salePrice,
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

    public updateItem(data): Observable<Object> {

        const gqlQuery = `
        mutation{
        InventoryUpdate(
            filter: {
            itemID: "${data.itemID}"
            },
            update: {
            itemID: "${data.itemID}",
            dateArrived: ${data.dateArrived},
            deviceID: "${data.deviceID}",
            lot: "${data.lot}",
            name: "${data.name}",
            origin: "${data.origin}",
            price: ${data.price},
            sku: "${data.sku}",
            totalWeight: ${data.totalWeight},
            upc: "${data.upc}"
            },
        ){
            matchedCount, modifiedCount
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

    public getTable(): Observable<Object> {

        const date = new Date().getTime()

        const gqlQuery = `
        {
            InventoryQueryCount(
            count: 50
            ){
            _id,
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
            salePrice,
            sku,
            soldWeight,
            timestamp,
            totalWeight,
            upc,
            wasteWeight
            }
        }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public deleteRows(item_id: string): Observable<Object> {
        console.log(item_id)
        const gqlQuery = `
        mutation{
            InventoryDelete(
            itemID: "${item_id}"
            ){
                deletedCount
            }
        }`

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public getQuery(data): Observable<Object> {
        const gqlQuery = `
    {
        InventoryQuery(
            itemID: ${data.itemID},
        ){
            _id,
            itemID,
            barcode,
            dateArrived,
            dateSold,
            deviceID,
            donateWeight,
            expiryDate,
            lot,
            name,
            origin,
            price,
            rsCustomerID,
            salePrice,
            sku,
            soldWeight,
            timestamp,
            totalWeight,
            upc,
            wasteWeight
        }
        }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public sendWarning(data): Observable<Object> {
        const gqlQuery = `
    mutation{
    addInventory(
        item_id: '${data.itemID}',
        upc: '${data.upc}',
        sku: '${data.sku}',
        name: '${data.name}',
        origin: '${data.origin}',
        device_id: '${data.deviceID}',
        total_weight: '${data.totalWeight}',
        price: '${data.price}',
        location: '${data.location}',
        date_arrived: '${data.dateArrived}',
        expiry_date: '${data.expiryDate}',
        timestamp: '${data.timestamp}',
        rs_customer_id: '${data.rsCustomerId}',
        waste_weight: '${data.wasteWeight}',
        donate_weight: '${data.donateWeight}',
        date_sold: '${data.dateSold}',
        sale_price: '${data.salePrice}',
        sold_weight: '${data.soldWeight}',
        lot: '${data}',
    ){accessToken, refreshToken}
    }
    `

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public insertSale(saleData): Observable<Object> {

        const gqlQuery = `
        mutation{
            SaleInsert(
            saleID: "${uuid()}",
            items: [
                {
                itemID: "${saleData.itemID}",
                weight: ${saleData.soldWeight},
                lot: "${saleData.lot}",
                upc: "${saleData.upc}",
                sku: "${saleData.sku}"
                }
            ]
            timestamp: ${saleData.timestamp},
            )
            {
            timestamp
            }
        }`
        console.log(gqlQuery)

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
