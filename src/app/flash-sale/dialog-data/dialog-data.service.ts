import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { FlashSale } from '../../models/flash-sale'

@Injectable()
export class UpdateFlashSaleService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public updateFlashSale(data: FlashSale): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        flash_id: ${data.itemId},
        item_id: ${data.itemId},
        upc: ${data.upc},
        sku: ${data.sku},
        name: ${data.name},
        origin: ${data.origin},
        device_id: ${data.deviceId},
        timestamp: ${data.timestamp},
        ethylene: ${data.ethylene},
        status: ${data.status},
        price: ${data.price},
        sale_price: ${data.salePrice},
        sold_weight: ${data.soldWeight},
        total_weight: ${data.totalWeight},
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
