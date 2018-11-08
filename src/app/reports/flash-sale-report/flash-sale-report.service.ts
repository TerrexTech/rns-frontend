import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { SendDate } from '../../models'

interface Reporting {
    sku: string
    name: string
    lot: string
}

@Injectable()
export class FlashSaleReportService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    getDays(days?: number): any[] {
        let dates = []
        const end_date = Math.round((new Date().getTime() / 1000) + (days * 86400))
        const start_date = Math.round(new Date().getTime() / 1000) - (days * 86400)

        return dates = [
            end_date, start_date
        ]
    }
    getToday(): any {
        let sendDates = []

        const sendDate = new SendDate()
        sendDate.endDate = this.getDays(1)[0]
        // sendDate.start_date = this.getDays(0)[1]
        console.log(sendDate)
        sendDates = [sendDate]

        const gqlQuery = `
    mutation{
      addInventory(
        end_date: '${sendDate.endDate}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    getData(data: Reporting): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        sku: '${data.sku}',
        name: '${data.name}',
        lot: '${data.lot}'
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
