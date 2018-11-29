import { TokenService } from '../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { FlashSale } from '../models/flash-sale'
import { environment } from '../../config'

@Injectable()
export class DonateDisposeService {
    count = 10
    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public getDonations(): Observable<Object> {

        const gqlQuery = `
        {
            DonationQueryCount(
                count: ${this.count}
            ){
                donationID,
                itemID,
                lot,
                name,
                sku,
                soldWeight,
                timestamp,
                totalWeight,
                donateWeight
            }
        }
    `
        console.log(gqlQuery)

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public newDonation(data): Observable<Object> {

        const gqlQuery = `
            mutation{
            FlashsaleInsert(
                itemID: "${data.itemID}",
                lot: "${data.lot}",
                name: "${data.name}",
                sku: "${data.sku}",
                soldWeight: ${data.soldWeight},
                timestamp: ${data.timestamp},
                totalWeight: ${data.totalWeight},
                onFlashsale: ${data.onFlashsale},
            ){
                flashsaleID,
                itemID,
                lot,
                name,
                sku,
                soldWeight,
                timestamp,
                totalWeight,
                onFlashsale
            }
        }
    `
        console.log(gqlQuery)

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }

    public getDisposals(): Observable<Object> {

        const gqlQuery = `
        {
            DisposalQueryCount(
                count: ${this.count}
            ){
                disposalID,
                itemID,
                lot,
                name,
                sku,
                soldWeight,
                timestamp,
                totalWeight,
                disposalWeight
            }
        }
    `
        console.log(gqlQuery)

        return this.http.post(`${environment.apiUrl}/api`, gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
