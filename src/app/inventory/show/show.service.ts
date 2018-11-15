import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Inventory } from '../../models/inventory'
import uuid from 'uuid/v4'

@Injectable()
export class ShowTableService {

    constructor(private http: HttpClient, private jwt: TokenService) {
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

        return this.http.post('http://162.212.158.16:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public getBeforeRows(): Observable<Object> {

        const date = new Date().getTime()

        const gqlQuery = `
            {
        InventoryQuery(
            timestamp: ${date},
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

        return this.http.post('http://162.212.158.16:8081' + '/api', gqlQuery, {
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

        return this.http.post('http://162.212.158.16:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public getQuery(data: Inventory): Observable<Object> {
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

        return this.http.post('http://162.212.158.16:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public sendWarning(data: Inventory): Observable<Object> {
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
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
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

        return this.http.post('http://162.212.158.16:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
