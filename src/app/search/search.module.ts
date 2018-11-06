import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CdkTableModule } from '@angular/cdk/table'
import { SearchComponent } from '../search/search.component'

import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatGridTile,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material'

@NgModule({
    imports: [
        CommonModule,
        CdkTableModule,
        FormsModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatButtonModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        SearchComponent
    ],
    exports: [
        SearchComponent
    ]
})

export class SearchModule { }
