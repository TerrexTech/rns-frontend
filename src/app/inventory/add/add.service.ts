import { TokenService } from '../../_Auth/token.service'
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

  constructor(private http: HttpClient, private jwt: TokenService) {
    this.mock = new MockUtils()
  }

  public addItem(data: ItemModel): Observable<Object> {

    const date = new Date().getTime() / 1000
    const gqlQuery = `
    mutation{
      InventoryInsert(
        itemId: '${data.item_id}',
        dateArrived: ${data.date_arrived},
        deviceId: '${data.device_id}',
        lot: '${data.lot}',
        name: '${data.name}',
        origin: '${data.origin}',
        price: ${data.price},
        rsCustomerId: '${this.jwt.getAccessToken().sub}',
        salePrice: ${data.price},
        sku: ${data.sku},
        timestamp: ${date},
        totalWeight: ${data.total_weight},
        upc: ${data.upc}
    ){
      _id,
    itemID,
    barcode,
    dateArrived,
    dateSold,
    deviceID,
    donateWeight,
    expiryDate,
    lot,
    name,
    origin,
    price,
    rsCustomerID,
    salePrice,
    sku,
    soldWeight,
    timestamp,
    totalWeight,
    upc,
    wasteWeight
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
