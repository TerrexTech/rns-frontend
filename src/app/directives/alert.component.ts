import { AlertService } from '../services/alert.service'
import { Component, OnDestroy , OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'component-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  message: any

  constructor(private alertService: AlertService) {
   }

  ngOnInit(): void {
    this.subscription = this.alertService.getMessage()
    .subscribe(message => {
      this.message = message
    })
  }

  ngOnDestroy(): void  {
    this.subscription.unsubscribe()
  }

}
