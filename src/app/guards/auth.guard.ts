import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'

// The auth guard is used to prevent unauthenticated users from accessing restricted routes,
// it's used in app.routing.ts to protect the dashboard page route

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('access_token')) {
            // logged in so return true
            return true
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }})
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
