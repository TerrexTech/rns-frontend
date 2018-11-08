import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { SendDate } from '../../models'

interface Warning {
    sku: string
    name: string
    lot: string
}

@Injectable()
export class CarbonService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    getData(data: Warning): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

}
