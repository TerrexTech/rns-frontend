import { TokenService } from '../../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Employee } from '../../models/employee'

@Injectable()
export class UserAddService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public registerEmployee(data: Employee): Observable<Object> {

        const gqlQuery = `
                mutation{
        authRegister(
            userName:"danpie3",
            password:"danpie",
            firstName:"obnoxious",
            lastName:"potato",
            email:"explosion",
            role:"employee"
        ){
            accessToken,
            refreshToken
        }
        }
        `

        return this.http.post('http://localhost:8081' + '/api', gqlQuery, {
            headers: {
                'Content-Type': 'application/text'
            }
        })
    }
}
