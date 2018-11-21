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
      ){accessToken, refreshToken}
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
      ){accessToken, refreshToken}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
    public newFlashSale(item_id: string): Observable<Object> {

        const gqlQuery = `
        mutation{
            FlashSaleInsert(
              FlashSaleID: "cdc7a14c-19e3-488e-8c4e-22d91fd42ef1",
              items: [
                {
                  itemID: "39322979-d33b-4504-ba90-f2e427bdd72b",
                  weight: 12.40,
                  lot: "test-lot",
                  upc: "test-upc",
                  sku: "test-sku"
                }
              ]
              timestamp: 1539222685400,
            )
            {
             timestamp
            }
          }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
