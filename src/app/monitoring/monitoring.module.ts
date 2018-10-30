import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CarbonComponent } from './carbon/carbon.component'
import { OverviewComponent } from './overview/overview.component'
import { EthyleneComponent } from './ethylene/ethylene.component'
import { SensorComponent } from './sensor/sensor.component'
import { TemperatureComponent } from './temperature/temperature.component'
// import { DataTableComponent } from "../data-table/data-table.component"
import { CdkTableModule } from '@angular/cdk/table'
import { GaugeChartComponent } from 'angular-gauge-chart'
import { ReportsTableModule } from '../reports-table/reports-table.module'

import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
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
        ReportsTableModule
    ],
    declarations: [
        CarbonComponent,
        OverviewComponent,
        GaugeChartComponent,
        SensorComponent,
        TemperatureComponent,
        EthyleneComponent
    ]
})

export class MonitoringModule {}
