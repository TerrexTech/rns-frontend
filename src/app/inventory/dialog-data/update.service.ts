import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Inventory } from '../../models/inventory'

interface ItemData {
  date_arrived: number,
  device_id: string,
  item_id: string
  lot: string
  name: string
  origin: string
  price: number
  sku: string
  total_weight: number
  upc: number
}

@Injectable()
export class UpdateInventoryService {

  constructor(private http: HttpClient, private jwt: TokenService) {
  }

  public updateItem(data: Inventory[]): Observable<Object> {

    const gqlQuery = `
    mutation{
      addInventory(
        item_id: '${data[0].itemId}',
        upc: ${data[0].upc},
        name: '${data[0].name}',
        origin: '${data[0].origin}',
        device_id: '${data[0].deviceId}',
        total_weight: ${data[0].totalWeight},
        price: ${data[0].price},
        lot: '${data[0].lot}',
        date_arrived: ${data[0].dateArrived},
        timestamp: ${Date.now()},
        rs_customer_id: '${this.jwt.getAccessToken().sub}',
        waste_weight: ${data[0].wasteWeight},
        donate_weight: ${data[0].donateWeight},
        date_sold: ${data[0].dateSold},
        sale_price: ${data[0].salePrice},
        sold_weight: ${data[0].soldWeight},
        quantity: ${Math.floor(data[0].totalWeight / data[0].soldWeight)}
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
