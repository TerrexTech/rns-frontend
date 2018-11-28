import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgModule } from '@angular/core'

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
    MatTabsModule,
    MatTooltipModule
} from '@angular/material'

import { WarningComponent } from './warning.component'
import { DialogDataDialogComponent } from './dialog-data/dialog-data.component'
import { DialogDataService } from './dialog-data/dialog-data.service'
import { NavbarService } from '../shared/navbar/navbar.service'
import { WarningService } from './warning.service'

@NgModule({
    declarations: [
        WarningComponent,
        DialogDataDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        // Material Components
        MatButtonModule,
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
        MatTooltipModule
    ],
    providers: [
        DialogDataService,
        NavbarService,
        WarningService
    ],
    exports: [
    ],
    entryComponents: [
        DialogDataDialogComponent
    ]
})
export class WarningModule { }
