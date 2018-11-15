import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { FlashSale } from '../../models/flash-sale'
import uuid from 'uuid'

@Injectable()
export class AddFlashSaleService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public newFlashSale(data: FlashSale): Observable<Object> {

        const gqlQuery = `
        mutation{
            FlashSaleInsert(
              FlashSaleID: "${uuid()}",
              items: [
                {
                  itemID: "${data.itemID}",
                  weight: ${data.soldWeight},
                  lot: "${data.lot}",
                  upc: "${data.upc}",
                  sku: "${data.sku}"
                }
              ]
              timestamp: ${data.timestamp},
            )
            {
             timestamp
            }
          }
    `
        console.log(gqlQuery)

        return this.http.post('http://162.212.158.16:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
