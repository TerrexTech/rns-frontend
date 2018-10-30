import { CommonModule } from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
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

import { UserAddComponent } from './user-add/user-add.component'
import { UserTableComponent } from './user-table/user-table.component'
import { DialogDataDialogComponent } from './dialog-data/dialog-data.component'

@NgModule({
  declarations: [
    DialogDataDialogComponent,
    UserAddComponent,
    UserTableComponent
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
  entryComponents: [ DialogDataDialogComponent ]
})
export class EmployeeModule {}
