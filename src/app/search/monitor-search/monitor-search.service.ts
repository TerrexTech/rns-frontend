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
            WarningQueryItem(
                sku: "${searchQuery.sku}",
                name: "${searchQuery.name}",
                lot: "${searchQuery.lot}"
            ){
                warningID,
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
                projectedDate,
                status
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
        public populateFields(): Observable<Object> {
            const gqlQuery = `
        {
            WarningQueryCount(
                count: 1
            ){
                warningID,
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
                projectedDate,
                status
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
