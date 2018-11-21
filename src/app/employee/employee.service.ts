import { TokenService } from '../_Auth/token.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Employee } from '../models/employee'
import { environment } from '../../config'

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient, private jwt: TokenService) {
    }

    public registerEmployee(data): Observable<Object> {

        const gqlQuery = `
        mutation{
        authRegister(
            userName:"${data.username}",
            password:"${data.password}",
            firstName:"${data.firstname}",
            lastName:"${data.lastname}",
            email:"${data.email}",
            role:"${data.roleSelect}"
        ){
            accessToken,
            refreshToken
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
