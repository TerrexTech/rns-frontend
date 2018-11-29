import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { SendDate } from '../../models'
import { environment } from '../../../config'

@Injectable()
export class SensorService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public getTable(): Observable<Object> {
        const count = 15
        const gqlQuery = `
            {
        DeviceQueryCount(
            count: ${count}
        ){
            itemID,
            deviceID,
            dateInstalled,
            lot,
            lastMaintenance,
            name,
            status,
            sku
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
