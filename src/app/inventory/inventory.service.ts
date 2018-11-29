import { TokenService } from '../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '../../config'
import { uuid } from 'uuid'
import { Inventory } from '../models/inventory'

@Injectable()
export class InventoryService {

    count = 10

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
            sku: "${data.sku}",
            soldWeight: 0,
            timestamp: ${Math.floor(date)},
            totalWeight: ${data.total_weight},
            upc: "${54754}",
            wasteWeight: 0
        ){
        itemID,
        dateArrived,
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
            soldWeight: ${data.soldWeight},
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

        const gqlQuery = `
        {
            InventoryQueryCount(
            count: ${this.count}
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

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public paginateTable(start: number, end: number): Observable<Object> {

        const gqlQuery = `
        {
            InventoryQueryTimestamp(
              start: ${start},
              end: ${end},
              count: ${this.count}
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
            itemID,
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
    WarningInsert(
        itemID: "${data.itemID}",
        sku: "${data.sku}",
        name: "${data.name}",
        totalWeight: ${data.totalWeight},
        timestamp: ${data.timestamp},
        soldWeight: ${data.soldWeight},
        lot: "${data.lot}",
        warningActive: ${data.warningActive}
        ethylene: ${data.ethylene},
        carbonDioxide: ${data.carbonDioxide},
        projectedDate: ${data.projectedDate}
    ){
        itemID,
        lot,
        name,
        sku,
        soldWeight,
        timestamp,
        totalWeight,
        warningActive,
        ethylene,
        carbonDioxide,
        projectedDate
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

    public insertSale(saleData: Inventory): Observable<Object> {

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
