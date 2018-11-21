import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router'

import { AppRoutes } from '../app.routes'
import { TokenService } from './token.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const accessToken = this.tokenService.getAccessToken()
    const refreshToken = this.tokenService.getRefreshToken()
    if (!accessToken) {
      this.router.navigate(
        [AppRoutes.login.path],
        {
          queryParams: {
            returnURL: state.url
          }
        }
      )
      .catch(err => {
        console.log('Error while redirecting to Login:')
        console.log(err)
      })

      return false
    }

    if (accessToken.role === 'employee') {

    }

    return true
  }

  // console.log('2222222222222222')

  // return false
  // if (localStorage.getItem('accessToken')) {

  //   return true
  // }
  //   if(localStorage.getItem('accessToken')) {

  //   return true
  // }
  // this.router.navigate(
  //   [AppRoutes.login.path],
  //   {
  //     queryParams: {
  //       returnUrl: state.url
  //     }
  //   }
  // )
  //     .then(log => {
  // //      console.log(log)

  //       return true
  //     })
  // .catch(err => {
  //   console.log(err)

  //   return false
  // })

  // return false
}
