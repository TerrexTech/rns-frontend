import { JWTService } from '../../_Auth/jwt.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ItemModel } from './item.model'
import { MockUtils } from './mockutils'
import { Observable } from 'rxjs/Observable'

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
export class AddInventoryService {
  private mock: MockUtils

  constructor(private http: HttpClient, private jwt: JWTService) {
    this.mock = new MockUtils()
  }

  public addItem(data: ItemModel): Observable<Object> {
    const d: ItemData = {
      date_arrived: new Date(data.date_arrived).getTime(),
      device_id: data.device_id,
      item_id: data.item_id,
      lot: data.lot,
      name: data.name,
      origin: data.origin,
      price: parseFloat(data.price),
      sku: data.sku,
      total_weight: parseFloat(data.total_weight),
      upc: data.upc
    }

    const quantity = Math.floor(d.total_weight / this.mock.avgWeight(d.name))
    const gqlQuery = `
    mutation{
      addInventory(
        item_id: '${d.item_id}',
        upc: ${d.upc},
        name: '${d.name}',
        origin: '${d.origin}',
        device_id: '${d.device_id}',
        total_weight: ${d.total_weight},
        price: ${d.price},
        lot: '${d.lot}',
        date_arrived: ${d.date_arrived},
        timestamp: ${Date.now()},
        rs_customer_id: '${this.jwt.getAccessToken().sub}',
        waste_weight: ${0},
        donate_weight: ${0},
        date_sold: ${0},
        sale_price: ${d.price},
        sold_weight: ${0},
        quantity: ${quantity}
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
