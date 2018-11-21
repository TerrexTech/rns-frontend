import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../config'

@Injectable()
export class AuthenticationService {

  returnUrl: string
  showError = false
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.http = http
  }

  login(resource: string, lStorage: boolean): boolean {
    const returnURL = this.route.snapshot.queryParamMap.get('returnURL')
    console.log(`${resource} &&&&&&&&&&&&&`)
    this.http.post(`${environment.apiUrl}/api`, resource)
      .toPromise()
      .then((data: any) => {
        console.log(data)
        console.log(data.data.login)
        if (lStorage && data.data.login !== null) {
        // if (data.data.login !== null) {
          localStorage.setItem('accessToken', data.data.login.accessToken)
          localStorage.setItem('refreshToken', data.data.login.refreshToken)
          this.router.navigate([`/${returnURL || 'dashboard'}`])
            .then(log => {
              console.log(log)
              // return true
              this.showError = true
            })
            .catch(err => {
              console.log(err)
              // return false
              this.showError = false
            })
          // this.showError = false

          return this.showError
        }
        else if (!lStorage && data.data.login !== null) {
          localStorage.setItem('accessToken', data.data.authLogin.accessToken)
          localStorage.setItem('refreshToken', data.data.authLogin.refreshToken)
          this.router.navigate([`/${returnURL || 'dashboard'}`])
            .then(log => {
              console.log(log)
              // return true
              this.showError = true
            })
            .catch(err => {
              console.log(err)
              // return false
              this.showError = false
            })
          // this.showError = false

          return this.showError
        }
        else {
          this.showError = true
          console.log('Match not found.....')

          return this.showError
        }
      })
      .catch(err => {
        console.log(err)
        // return this.showError
        this.showError = true
      })
    console.log(`${this.showError} ERRRRRRRRRRRR`)

    return this.showError
    // this.http.post('localhost:8080/users/authenticate', resource)
    //   .toPromise()
    //   .then(d => this.data)
    //   .then(data => {
    //     console.log(data.data.login)
    //     if (this.data.data.login.accessToken == null) {
    //       // this.response.innerHTML = 'Invalid Credentials'
    //       console.log('invalid credentials')
    //     }
    //     else {
    //       localStorage.setItem('accessToken', data.data.login.accessToken)
    //       localStorage.setItem('refreshToken', data.data.login.refreshToken)
    //       return data

    //     }
    //   })

    // return
    // this.http.post<any>()
    //   .pipe(map(token => {
    //     console.log(token)
    //     // login successful if there's a jwt token in the response
    //     // if (token.accessToken) {
    //     //   // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     //   localStorage.setItem('accessToken', token.accessToken)
    //     //   this.global.parsedToken = this.global.getDecodedAccessToken()

    //     //   console.log(token.accessToken)
    //     // }

    //     // return token.accessToken

    //     if (token.data) {
    //       localStorage.setItem('accessToken', token.data.login)
    //       this.global.parsedToken = this.global.getDecodedAccessToken()
    //     }
    //     // return token
    //   }))

  }

  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}
