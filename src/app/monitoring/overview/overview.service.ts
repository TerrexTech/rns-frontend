import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Inventory } from '../../models/inventory'

@Injectable()
export class OverviewService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public getMetrics(): Observable<Object> {

        const d: any = [{
            end_date: new Date().getTime()
        }]
        console.log(d)

        const gqlQuery = `
    mutation{
      getMetrics(
        end_date: '${d.end_date}'
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
