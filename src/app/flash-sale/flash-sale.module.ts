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
    MatTabsModule
} from '@angular/material'

import { ViewFlashsaleComponent } from './view-flashsale/view-flashsale.component'
import { DialogDataDialogComponent } from './dialog-data/dialog-data.component'
import { AddDialogDataComponent } from './add-dialog-data/add-dialog-data.component'
import { DonateFoodComponent } from './donate-food/donate-food.component'
import { DisposeFoodComponent } from './dispose-food/dispose-food.component'
@NgModule({
    declarations: [
        ViewFlashsaleComponent,
        DialogDataDialogComponent,
        AddDialogDataComponent,
        DonateFoodComponent,
        DisposeFoodComponent
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
        MatButtonModule
    ],
    providers: [],
    exports: [
    ],
    entryComponents: [
        DialogDataDialogComponent,
        AddDialogDataComponent
    ]
})
export class FlashSaleModule { }
