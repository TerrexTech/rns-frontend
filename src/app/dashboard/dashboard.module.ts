import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { DashboardComponent } from './dashboard.component'

import { NgModule } from '@angular/core'
import { DashboardService } from './dashboard.service'

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [DashboardComponent],
    providers: [
        DashboardService
    ]
})

export class DashboardModule {}
