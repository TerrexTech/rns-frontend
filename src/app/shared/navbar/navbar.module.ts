import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { NavbarComponent } from './navbar.component'

import { MatBadgeModule } from '@angular/material'

@NgModule({
    imports: [ RouterModule, CommonModule, MatBadgeModule ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})
export class NavbarModule {}
