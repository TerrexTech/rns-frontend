import { Injectable } from '@angular/core'
import * as jwt_decode from 'jwt-decode'

import { AccessToken } from './access_token.model'

@Injectable()
export class JWTService {
  decodedAccessToken: AccessToken

  getAccessToken(): AccessToken {
    if (!this.decodedAccessToken) {
      const accessToken = this.getAccessTokenRaw()
      this.decodedAccessToken = jwt_decode(accessToken)
    }

    return this.decodedAccessToken
  }

  getAccessTokenRaw(): string {
    return localStorage.getItem('access_token')
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token')
  }

  isTokenExpired(): any {
    const deToken = this.getAccessToken()

    if (!deToken.exp) {
      return true
    }

    const date = new Date(0)

    const tokenDateStr = this.decodedAccessToken.exp
    date.setUTCSeconds(Date.parse(tokenDateStr))
    console.log('********************')
    console.log(date.valueOf)

    return !(date.valueOf() > new Date().valueOf())
  }
}
