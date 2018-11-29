import { TokenService } from '../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { FlashSale } from '../models/flash-sale'
import { environment } from '../../config'

@Injectable()
export class FlashSaleService {
    count = 10
    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public newFlashSale(data): Observable<Object> {

        const gqlQuery = `
            mutation{
            FlashsaleInsert(
                itemID: "${data.itemID}",
                lot: "${data.lot}",
                name: "${data.name}",
                sku: "${data.sku}",
                soldWeight: ${data.soldWeight},
                timestamp: ${data.timestamp},
                totalWeight: ${data.totalWeight},
                onFlashsale: ${data.onFlashsale},
            ){
                flashsaleID,
                itemID,
                lot,
                name,
                sku,
                soldWeight,
                timestamp,
                totalWeight,
                onFlashsale
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

    public editFlashSale(data): Observable<Object> {
        const date = new Date().getTime() / 1000
        const gqlQuery = `
        mutation{
        FlashsaleUpdate(
            filter: {
                flashsaleID: "${data.flashsaleID}"
            },
            update: {
                itemID: "${data.itemID}",
                lot: "${data.lot}",
                name: "${data.name}",
                sku: "${data.sku}",
                soldWeight: ${data.soldWeight},
                timestamp: ${Number(date.toFixed(0))},
                totalWeight: ${data.totalWeight}
                onFlashsale: ${data.onFlashsale}
            }
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

    public getFlashSales(): Observable<Object> {

        const gqlQuery = `
        {
            FlashsaleQueryCount(
                count: ${this.count}
            ){
                flashsaleID,
                itemID,
                lot,
                name,
                sku,
                soldWeight,
                timestamp,
                totalWeight,
                onFlashsale
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
