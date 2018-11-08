import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Inventory } from '../../models/inventory'

@Injectable()
export class ShowTableService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public getTable(): Observable<Object> {

        const d: any = [{
            end_date: new Date().getTime()
        }]
        console.log(d)

        const gqlQuery = `
    mutation{
      addInventory(
        end_date: '${d.end_date}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public deleteRows(item_id: string): Observable<Object> {

        const d: any = [{
            item_id: {item_id}
        }]
        console.log(d)

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
}
