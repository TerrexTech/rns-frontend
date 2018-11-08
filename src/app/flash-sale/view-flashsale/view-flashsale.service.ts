import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { FlashSale } from '../../models/flash-sale'

@Injectable()
export class ViewFlashSaleService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public getEndFlashSale(item_id: string): Observable<Object> {
        const d: any = {
            item_id: {item_id}
        }

        const gqlQuery = `
    mutation{
      addInventory(
        item_id: '${d.item_id}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public removeFlashSale(item_id: string): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        item_id: '${item_id}'
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
