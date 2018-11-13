import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CdkTableModule } from '@angular/cdk/table'

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
import { ReportSearchComponent } from './report-search/report-search.component'
import { MonitorSearchComponent } from './monitor-search/monitor-search.component'
import { TableSearchComponent } from './table-search/table-search.component'
import { TableSearchService } from './table-search/table-search.service'

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
        ReportSearchComponent,
        MonitorSearchComponent,
        TableSearchComponent
    ],
    exports: [
        ReportSearchComponent,
        TableSearchComponent,
        MonitorSearchComponent
    ],
    providers: [
        TableSearchService
    ]

})

export class SearchModule { }
