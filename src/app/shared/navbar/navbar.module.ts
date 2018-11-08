import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { NavbarComponent } from './navbar.component'

import { MatBadgeModule } from '@angular/material'
import { NavbarService } from '../../shared/navbar/navbar.service'

@NgModule({
    imports: [ RouterModule, CommonModule, MatBadgeModule ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ],
    providers: [
        NavbarService
    ]
})
export class NavbarModule {}
