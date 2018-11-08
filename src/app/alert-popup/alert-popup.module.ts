import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgModule } from '@angular/core'
import { WarningModule } from '../warning/warning.module'
import { AlertService } from '../alert-popup/alert.service'
import { Router, RouterModule } from '@angular/router'

// Material Components
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material'

import { AlertPopupComponent } from './alert-popup.component'

@NgModule({
    declarations: [
        AlertPopupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        // Material Components
        MatCheckboxModule,
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatButtonModule,
        RouterModule
    ],
    providers: [
        AlertService
    ],
    exports: [
        AlertPopupComponent
    ],
    entryComponents: [

    ]
})
export class AlertPopupModule { }
