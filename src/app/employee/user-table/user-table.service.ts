import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UserTableService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public getTable(): Observable<Object> {

        const date = new Date().getTime() / 1000

        const gqlQuery = `
            {
        InventoryQuery(
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

        return this.http.post('http://162.212.158.16:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public deleteRows(item_id: string): Observable<Object> {

        const d: any = [{
            item_id: {item_id}
        }]
        console.log(d)

        const gqlQuery = `
        mutation{
        InventoryDelete(
            itemID: ${item_id},
        ){
            deletedCount
        }
        }`

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

}
