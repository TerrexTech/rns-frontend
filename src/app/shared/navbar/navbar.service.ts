import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class NavbarService {

    constructor(private http: HttpClient, private jwt: TokenService) {

    }

    public getAlertCount(): Observable<Object> {

        return this.http.get('http://localhost:8081' + '/api', {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
