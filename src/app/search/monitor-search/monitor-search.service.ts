import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

interface Query {
    sku: string
    name: string
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
        sku: '${searchQuery['sku']}',
        name: '${searchQuery['name']}',
        start_date: '${searchQuery['start_date']}',
        end_date: '${searchQuery['end_date']}',
        exact_match: '${searchQuery['exact_match']}',
      ){accessToken, refreshToken}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
