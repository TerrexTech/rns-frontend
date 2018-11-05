import { Injectable } from '@angular/core'
import * as jwt_decode from 'jwt-decode'

import { AccessToken } from './access-token.model'
import { root } from 'rxjs/internal/util/root'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  decodedAccessToken: AccessToken
  accessToken: string
  refreshToken: string

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
    return localStorage.getItem('access_token')
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token')
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

  changeToken(): void {

  }

}
