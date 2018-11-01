import { JWTService } from '../../_Auth/jwt.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ItemModel } from './item.model'
import { MockUtils } from './mockutils'
import { Observable } from 'rxjs/Observable'

export interface ItemData {
  sku: string
  name: string
  leftover_waste: number
  status: string
  projected_expiry: number
}

@Injectable()
export class UpdateFlashSaleService {
  private mock: MockUtils

  constructor(private http: HttpClient, private jwt: JWTService) {
    this.mock = new MockUtils()
  }

  public addItem(data: ItemModel): Observable<Object> {
    const d: ItemData = {
      sku: data.sku,
      name: data.name,
      leftover_waste: data.leftover_waste,
      status: data.status,
      projected_expiry: new Date(data.leftover_waste).getTime()
      }

    const gqlQuery = `
    mutation{
      addInventory(
        sku: '${d.sku}',
        name: '${d.name}',
        leftover_waste: '${d.leftover_waste}',
        status: '${d.status}',
        projected_expiry: '${d.projected_expiry}'
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
