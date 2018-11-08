import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CdkTableModule } from '@angular/cdk/table'
import { EthyleneReportComponent } from './ethylene-report/ethylene-report.component'
import { FlashSaleReportComponent } from './flash-sale-report/flash-sale-report.component'
import { InventoryReportComponent } from './inventory-report/inventory-report.component'
import { SavingsReportComponent } from './savings-report/savings-report.component'
import { SensorReportComponent } from './sensor-report/sensor-report.component'
import { WasteReportComponent } from './waste-report/waste-report.component'
import { ReportsTableModule } from '../reports-table/reports-table.module'
import { TemphumidReportComponent } from './temphumid-report/temphumid-report.component'
import { SearchModule } from '../search/search.module'
import { ReportSearchComponent } from '../search/report-search/report-search.component'
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
import { ReportSearchService } from '../search/report-search/report-search.service'
import { EthyleneReportService } from './ethylene-report/ethylene-report.service'
import { FlashSaleReportService } from './flash-sale-report/flash-sale-report.service'
import { InventoryReportService } from './inventory-report/inventory-report.service'
import { SavingsReportService } from './savings-report/savings-report.service'
import { SensorReportService } from './sensor-report/sensor-report.service'
import { TempHumidReportService } from './temphumid-report/temphumid-report.service'
import { WasteReportService } from './waste-report/waste-report.service'

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
        MatNativeDateModule,
        ReportsTableModule,
        SearchModule
    ],
    declarations: [
        EthyleneReportComponent,
        FlashSaleReportComponent,
        InventoryReportComponent,
        SavingsReportComponent,
        SensorReportComponent,
        WasteReportComponent,
        TemphumidReportComponent
    ],
    entryComponents: [
        ReportSearchComponent
    ],
    providers: [
        ReportSearchService,
        EthyleneReportService,
        FlashSaleReportService,
        InventoryReportService,
        SavingsReportService,
        SensorReportService,
        TempHumidReportService,
        WasteReportService
    ]
})

export class ReportsModule { }
