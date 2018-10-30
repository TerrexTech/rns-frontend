import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material'
import { JWTService } from '../_Auth/jwt.service'

import { Inventory } from '../models/inventory'
import { AddComponent } from './add/add.component'
import { AddInventoryService } from './add/add.service'
import { DialogDataDialogComponent } from './dialog-data/dialog-data.component'
import { ShowComponent } from './show/show.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatOptionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        AddComponent,
        ShowComponent,
        DialogDataDialogComponent
        // InvDashComponent
        // FieldErrorDisplayComponent,
    ],
    providers: [
        AddInventoryService,
        // AlertService
        Inventory,
        JWTService
    ],
    entryComponents: [
        DialogDataDialogComponent
    ]
})

export class InventoryModule {}
