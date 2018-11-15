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
import { TokenService } from '../_Auth/token.service'

import { Inventory } from '../models/inventory'
import { AddComponent } from './add/add.component'
import { AddInventoryService } from './add/add.service'
import { DialogDataDialogComponent } from './dialog-data/dialog-data.component'
import { ShowComponent } from './show/show.component'
import { SearchModule } from '../search/search.module'
import { TableSearchComponent } from '../search/table-search/table-search.component'
import { ShowTableService } from './show/show.service'
import { AlertPopupModule } from '../alert-popup/alert-popup.module'
import { AlertPopupComponent } from '../alert-popup/alert-popup.component'
import { NavbarService } from '../shared/navbar/navbar.service'
import { UpdateInventoryService } from './dialog-data/update.service'
import { NavbarModule } from '../shared/navbar/navbar.module'
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
        MatNativeDateModule,
        SearchModule,
        AlertPopupModule,
        NavbarModule
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
        TokenService,
        ShowTableService,
        NavbarService,
        UpdateInventoryService
    ],
    entryComponents: [
        DialogDataDialogComponent,
        TableSearchComponent,
        AlertPopupComponent
    ]
})

export class InventoryModule {}
