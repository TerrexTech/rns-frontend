import { TokenService } from '../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { SendDate } from '../models'

@Injectable()
export class ShowTableService {

    getDays(days?: number): any[] {
        let dates = []
        const endDate = Math.round((new Date().getTime() / 1000) + (days * 86400))
        const startDate = Math.round(new Date().getTime() / 1000) - (days * 86400)

        return dates = [
            endDate, startDate
        ]
    }
    getToday(): any {
        let sendDates = []

        const sendDate = new SendDate()
        sendDate.endDate = this.getDays(1)[0]
        // sendDate.startDate = this.getDays(0)[1]
        console.log(sendDate)
        sendDates = [sendDate]

        const gqlQuery = `
    mutation{
      addInventory(
        endDate: '${sendDate.endDate}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public getTotal(): Observable<Object> {

        let sendDates = []

        const sendDate = new SendDate()
        sendDate.endDate = this.getDays(1)[0]
        sendDate.startDate = this.getDays(1)[1]

        const sendDate2 = new SendDate()
        sendDate2.endDate = this.getDays(2)[0]
        sendDate2.startDate = this.getDays(2)[1]

        const sendDate3 = new SendDate()
        sendDate3.endDate = this.getDays(3)[0]
        sendDate3.startDate = this.getDays(3)[1]

        const sendDate4 = new SendDate()
        sendDate4.endDate = this.getDays(4)[0]
        sendDate4.startDate = this.getDays(4)[1]

        sendDates = [sendDate, sendDate2, sendDate3, sendDate4]

        const d: any = [{
            endDate: new Date().getTime()
        }]
        console.log(d)

        const gqlQuery = `
    mutation{
      addInventory(
        endDate: '${d.endDate}'
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public getSold(): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        item_id: ''
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public getDist(): Observable<Object> {

        const gqlQuery = `
    mutation{
      addInventory(
        item_id: ''
      ){access_token, refresh_token}
    }
    `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public getDonations(): Observable<Object> {

        const d: any = [{
            item_id: {  }
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
