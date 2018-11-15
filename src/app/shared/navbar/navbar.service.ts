import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class NavbarService {

    alertCount: number
    constructor(private http: HttpClient, private jwt: TokenService) {

    }

    // public getAlertCount(): Observable<Object> {

    //     return this.http.get('http://localhost:8081' + '/api', {
    //         headers: {
    //             'Content-Type': 'application/text'
    //         }
    //     })
    // }

    public setAlertCount(count: number): void {
        this.alertCount = count
    }

    public getAlertCount(): number {
        console.log(this.alertCount)

        return this.alertCount
    }
}
