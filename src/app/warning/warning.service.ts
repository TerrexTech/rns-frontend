import { TokenService } from '../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '../../config'
import { uuid } from 'uuid'

@Injectable()
export class WarningService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public getWarnings(): Observable<Object> {

        const gqlQuery = `
        {
            WarningQueryCount(
            count: 100
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
                projectedDate
            }
        }
    `

        return this.http.post(`${environment.bhupeshIP}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
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
                projectedDate: ${data.projectedDate},
            ){
                flashsaleID,
                itemID,
                lot,
                name,
                sku,
                soldWeight,
                timestamp,
                totalWeight,
                projectedDate,
                onFlashsale
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

    public deleteWarning(data): Observable<Object> {

        const gqlQuery = `
            mutation{
            WarningDelete(
                itemID: "${data}"
            ){
                deletedCount
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

}
