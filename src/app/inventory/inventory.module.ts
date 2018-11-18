import { AddComponent } from './add/add.component'
import { AlertPopupComponent } from '../alert-popup/alert-popup.component'
import { DialogDataDialogComponent } from './dialog-data/dialog-data.component'
import { ShowComponent } from './show/show.component'
import { TableSearchComponent } from '../search/table-search/table-search.component'

import { AlertPopupModule } from '../alert-popup/alert-popup.module'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NavbarModule } from '../shared/navbar/navbar.module'
import { NgModule } from '@angular/core'
import { SearchModule } from '../search/search.module'

import { InventoryService } from './inventory.service'
import { NavbarService } from '../shared/navbar/navbar.service'
import { TokenService } from '../_Auth/token.service'
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
        // AlertService
        InventoryService,
        TokenService,
        NavbarService
    ],
    entryComponents: [
        DialogDataDialogComponent,
        TableSearchComponent,
        AlertPopupComponent
    ]
})

export class InventoryModule {}
