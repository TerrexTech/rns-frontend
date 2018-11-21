import { Injectable } from '@angular/core'
import * as jwt_decode from 'jwt-decode'
import { environment } from '../../config'
import { AccessToken } from './access-token.model'
import { root } from 'rxjs/internal/util/root'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  decodedAccessToken: AccessToken
  accessToken: string
  refreshToken: string

  constructor(private http: HttpClient) {
    this.http = http
  }

  getAccessToken(): AccessToken {
    const rawAccessToken = this.getAccessTokenRaw()
    if (!rawAccessToken) {
      return undefined
    }

    if (!this.decodedAccessToken) {
      this.decodedAccessToken = jwt_decode(rawAccessToken)
    }

    const isExpired = this.isTokenExpired(this.decodedAccessToken)
    if (!isExpired) {
      return this.decodedAccessToken
    }

    return undefined
  }

  getAccessTokenRaw(): string {
    return localStorage.getItem('accessToken')
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken')
  }

  isTokenExpired(accessToken: AccessToken): any {
    if (!accessToken.exp) {
      return true
    }

    const tokenDate = new Date(0)

    const tokenDateStr = this.decodedAccessToken.exp
    tokenDate.setUTCSeconds(Date.parse(tokenDateStr))
    console.log('********************')
    console.log(tokenDate.valueOf)

    const isExpired = tokenDate.valueOf() < new Date().valueOf()

    return isExpired
  }

  setMemAccessToken(accessToken: string): void {
    this.decodedAccessToken = jwt_decode(accessToken)
  }

  getMemAccessToken(): AccessToken {
    const isExpired = this.isTokenExpired(this.decodedAccessToken)
    if (!isExpired) {
      return this.decodedAccessToken
    }

    return undefined
  }

  setMemRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken
  }

  getMemRefreshToken(): string {
    return this.refreshToken
  }

  changeToken(): any {
    this.http.post(`${environment.apiUrl}/api`, this.refreshToken)
      .toPromise()
      .then((data: any) => {
        if (data.data.login) {
          this.accessToken = data.data.login.accessToken
        }
      })
      .catch(console.log)

    return
  }

}
