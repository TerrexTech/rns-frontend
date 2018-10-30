import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { DashboardComponent } from './dashboard.component'

import { NgModule } from '@angular/core'

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [DashboardComponent]
})

export class DashboardModule {}
