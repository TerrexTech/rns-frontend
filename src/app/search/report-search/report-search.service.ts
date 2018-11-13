import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

interface Query {
    sku: string
    name: string
    origin: string
    lot: string
    start_date: number
    end_date: number
    exact_match: boolean
}

@Injectable()
export class ReportSearchService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public search(searchQuery): Observable<Object> {
        console.log(searchQuery)
        const gqlQuery = `
    mutation{
      search(
        start_date: '${searchQuery['start_date']}',
        end_date: '${searchQuery['end_date']}',
       ){access_token, refresh_token}
    }
    `
        console.log(gqlQuery)

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
