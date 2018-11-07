import { Component, Input, OnInit } from '@angular/core'
import { Alert, AlertType } from './alert'
import { AlertService } from './alert.service'

interface ButtonConfig {
    text: string,
    url: string
}

@Component({
  selector: 'component-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent implements OnInit {

    @Input() message: string
    @Input() buttons: ButtonConfig[]
    constructor(private alertService: AlertService) { }

    ngOnInit(): void {
        console.log(this.message)
        console.log(this.buttons)
    }

    removeAlert(alert: Alert): void {
    }

}
