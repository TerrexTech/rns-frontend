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
export class DialogDataService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    newFlashSale(data: Warning): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){accessToken, refreshToken}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    newDonation(data: Warning): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){accessToken, refreshToken}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    newDisposal(data: Warning): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
      ){accessToken, refreshToken}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

}
