import { Component, OnInit } from '@angular/core'
import { Alert, AlertType } from './alert'
import { AlertService } from './alert.service'

@Component({
  selector: 'component-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent implements OnInit {

  alerts: Alert[] = []

    constructor(private alertService: AlertService) { }

    ngOnInit(): void {
        this.alertService.getAlert()
        .subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = []

                return
            }

            // add alert to array
            this.alerts.push(alert)
        })
    }

    removeAlert(alert: Alert): void {
        this.alerts = this.alerts.filter(x => x !== alert)
    }

    cssClass(alert: Alert): any {
        if (!alert) {
            return
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success'
            case AlertType.Error:
                return 'alert alert-danger'
            case AlertType.Info:
                return 'alert alert-info'
            case AlertType.Warning:
                return 'alert alert-warning'
            default:
        }
    }
}
