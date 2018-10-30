import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginPageComponent } from './login-page.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        LoginPageComponent
    ]
})

export class LoginPageModule { }
