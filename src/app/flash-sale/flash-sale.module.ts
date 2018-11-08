import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgModule } from '@angular/core'
import { WarningModule } from '../warning/warning.module'
import { AlertService } from '../alert-popup/alert.service'
import { ViewFlashSaleService } from './view-flashsale/view-flashsale.service'

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
import { ViewFlashsaleComponent } from './view-flashsale/view-flashsale.component'
import { DialogDataDialogComponent } from './dialog-data/dialog-data.component'
import { AddDialogDataComponent } from './add-dialog-data/add-dialog-data.component'
import { AlertPopupModule } from '../alert-popup/alert-popup.module'
import { SearchModule } from '../search/search.module'
import { TableSearchComponent } from '../search/table-search/table-search.component'
@NgModule({
    declarations: [
        ViewFlashsaleComponent,
        DialogDataDialogComponent,
        AddDialogDataComponent
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
        ViewFlashSaleService
    ],
    exports: [
    ],
    entryComponents: [
        DialogDataDialogComponent,
        AddDialogDataComponent,
        AlertPopupComponent,
        TableSearchComponent
    ]
})
export class FlashSaleModule { }
