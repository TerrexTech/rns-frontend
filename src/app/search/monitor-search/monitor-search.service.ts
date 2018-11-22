import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '../../../config'

interface Query {
    sku: string
    name: string
    lot: string
    start_date: number
    end_date: number
    exact_match: boolean
}

@Injectable()
export class MonitorSearchService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public search(searchQuery): Observable<Object> {
            console.log(searchQuery)
            const gqlQuery = `
        {
            InventoryQueryItem(
                sku: "${searchQuery.sku}",
                name: "${searchQuery.name}",
                lot: "${searchQuery.lot}"
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
