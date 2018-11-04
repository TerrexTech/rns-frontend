import { Injectable } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { Alert, AlertType } from './alert'

@Injectable()
export class AlertService {
    private subject = new Subject<Alert>()
    private keepAfterRouteChange = false

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false
                } else {
                    // clear alert messages
                    this.clear()
                }
            }
        })
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable()
    }

    success(message: string, keepAfterRouteChange = false): void {
        this.alert(AlertType.Success, message, keepAfterRouteChange)
    }

    error(message: string, keepAfterRouteChange = false): void {
        this.alert(AlertType.Error, message, keepAfterRouteChange)
    }

    info(message: string, keepAfterRouteChange = false): void {
        this.alert(AlertType.Info, message, keepAfterRouteChange)
    }

    warn(message: string, keepAfterRouteChange = false): void {
        this.alert(AlertType.Warning, message, keepAfterRouteChange)
    }

    alert(type: AlertType, message: string, keepAfterRouteChange = false): void {
        this.keepAfterRouteChange = keepAfterRouteChange
        this.subject.next({ type, message } as Alert)
    }

    clear(): void {
        // clear alerts
        this.subject.next()
    }
}
