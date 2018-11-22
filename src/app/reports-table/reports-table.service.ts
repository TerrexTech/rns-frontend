import { TokenService } from '../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

interface Warning {
    sku: string
    name: string
    lot: string
}

@Injectable()
export class ReportTableService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public getTable(endPoint: string): Observable<Object> {

        const date = new Date().getTime() / 1000

        const gqlQuery = `
            {
        InventoryQuery(
            timestamp: ${date},
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

        return this.http.post(`http://localhost:8081/${endPoint}`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
