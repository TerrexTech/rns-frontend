import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router'

import { AppRoutes } from '../app.routes'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('2222222222222222')

    // return false
    // if (localStorage.getItem('access_token')) {

    //   return true
    // }

    this.router.navigate(
      [AppRoutes.login.path],
      {
        queryParams: {
          returnUrl: state.url
        }
      }
    )
    .then(log => {
      console.log(log)

      return true
    })
    .catch(err => {
      console.log(err)

      return false
    })

    return false
  }
}
