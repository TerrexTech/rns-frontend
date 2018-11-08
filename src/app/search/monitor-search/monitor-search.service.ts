import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

interface Query {
    upc: string
    sku: string
    name: string
    origin: string
    price: string
    lot: string
    start_date: number
    end_date: number
    exact_match: boolean
}

@Injectable()
export class MonitorSearchService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public search(searchQuery: Query[]): Observable<Object> {

        const gqlQuery = `
    mutation{
      search(
        sku: '${searchQuery[0].sku}',
        name: '${searchQuery[0].name}',
        start_date: '${searchQuery[0].start_date}',
        end_date: '${searchQuery[0].end_date}',
        exact_match: '${searchQuery[0].exact_match}',
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
