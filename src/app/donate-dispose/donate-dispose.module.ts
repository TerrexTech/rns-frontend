import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgModule } from '@angular/core'
import { WarningModule } from '../warning/warning.module'
import { AlertService } from '../alert-popup/alert.service'

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

import { AlertPopupComponent } from '../alert-popup/alert-popup.component'
import { DonateFoodComponent } from './donate-food/donate-food.component'
import { DisposeFoodComponent } from './dispose-food/dispose-food.component'
import { AlertPopupModule } from '../alert-popup/alert-popup.module'
import { SearchModule } from '../search/search.module'
import { TableSearchComponent } from '../search/table-search/table-search.component'
import { DialogDataDialogComponent } from './dialog-data/dialog-data.component'
import { NavbarService } from '../shared/navbar/navbar.service'
@NgModule({
    declarations: [
        DonateFoodComponent,
        DisposeFoodComponent,
        DialogDataDialogComponent
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
        AlertPopupModule,
        SearchModule
    ],
    providers: [
        AlertService,
        NavbarService
    ],
    exports: [
    ],
    entryComponents: [
        AlertPopupComponent,
        TableSearchComponent,
        DialogDataDialogComponent
    ]
})
export class DonateDisposeModule { }
