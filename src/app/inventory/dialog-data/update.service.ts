import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Inventory } from '../../models/inventory'

@Injectable()
export class UpdateInventoryService {

  constructor(private http: HttpClient, private jwt: TokenService) {
  }

  public updateItem(data: Inventory): Observable<Object> {

    const gqlQuery = `
    mutation{
      InventoryUpdate(
        filter: {
          itemID: "${data.itemID}"
        },
        update: {
          itemID: "${data.itemID}",
          dateArrived: ${data.dateArrived},
          deviceID: "${data.deviceID}",
          lot: "${data.lot}",
          name: "${data.name}",
          origin: "${data.origin}",
          price: ${data.price},
          sku: "${data.sku}",
          totalWeight: ${data.totalWeight},
          upc: "${data.upc}"
        },
      ){
          matchedCount, modifiedCount
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
