import { Injectable } from '@angular/core'

@Injectable()
export class AuthenticationService {

  login(resource: string): void {
    console.log('-----------------')
    console.log(resource)

    // this.http.post('localhost:8080/users/authenticate', resource)
    //   .toPromise()
    //   .then(d => this.data)
    //   .then(data => {
    //     console.log(data.data.login)
    //     if (this.data.data.login.access_token == null) {
    //       // this.response.innerHTML = 'Invalid Credentials'
    //       console.log('invalid credentials')
    //     }
    //     else {
    //       localStorage.setItem('access_token', data.data.login.access_token)
    //       localStorage.setItem('refresh_token', data.data.login.refresh_token)
    //       return data

    //     }
    //   })

    // return
    // this.http.post<any>()
    //   .pipe(map(token => {
    //     console.log(token)
    //     // login successful if there's a jwt token in the response
    //     // if (token.access_token) {
    //     //   // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     //   localStorage.setItem('access_token', token.access_token)
    //     //   this.global.parsedToken = this.global.getDecodedAccessToken()

    //     //   console.log(token.access_token)
    //     // }

    //     // return token.access_token

    //     if (token.data) {
    //       localStorage.setItem('access_token', token.data.login)
    //       this.global.parsedToken = this.global.getDecodedAccessToken()
    //     }
    //     // return token
    //   }))
  }

  logout(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}
