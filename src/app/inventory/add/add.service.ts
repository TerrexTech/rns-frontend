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
        itemID: "${data.item_id}",
        barcode: "a",
        dateArrived: ${data.date_arrived},
        deviceID: "${data.device_id}",
        lot: "${data.lot}",
        name: "${data.name}",
        origin: "${data.origin}",
        price: ${12},
        rsCustomerID: "${this.jwt.getAccessToken().sub}",
        salePrice: ${12},
        sku: "${data.sku}",
        timestamp: ${Math.floor(date)},
        totalWeight: ${12},
        upc: ${54754}
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
    console.log(gqlQuery)

    return this.http.post('http://107.152.35.153:8081' + '/api', gqlQuery, {
      headers: {
        'Content-Type': 'application/text'
      }
    })
  }
}
