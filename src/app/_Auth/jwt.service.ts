import { Injectable } from '@angular/core'
import * as jwt_decode from 'jwt-decode'

import { AccessToken } from './access-token.model'

@Injectable()
export class TokenService {
  decodedAccessToken: AccessToken

  getAccessToken(): AccessToken {
    if (!this.decodedAccessToken) {
      const accessToken = this.getAccessTokenRaw()
      if (!accessToken) {
        return undefined
      }
      this.decodedAccessToken = jwt_decode(accessToken)
    }

    if (!this.isTokenExpired(this.decodedAccessToken)) {
      return this.decodedAccessToken
    }
  }

  getAccessTokenRaw(): string {
    return localStorage.getItem('access_token')
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token')
  }

  isTokenExpired(deToken: AccessToken): any {
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
