import { Routes } from '@angular/router'

import { EthyleneReportComponent } from './ethylene-report/ethylene-report.component'
import { FlashSaleReportComponent } from './flash-sale-report/flash-sale-report.component'
import { InventoryReportComponent } from './inventory-report/inventory-report.component'
import { SavingsReportComponent } from './savings-report/savings-report.component'
import { SensorReportComponent } from './sensor-report/sensor-report.component'
import { WasteReportComponent } from './waste-report/waste-report.component'
import { TemphumidReportComponent } from './temphumid-report/temphumid-report.component'

export const ReportsRoutes = {
  ethylene: {
    path: 'ethylene-report',
    title: 'Ethylene Report',
    component: EthyleneReportComponent
  },
  flashsale: {
    path: 'flash-sale-report',
    title: 'Flash Sale Report',
    component: FlashSaleReportComponent
  },
    inventory: {
        path: 'inventory-report',
        title: 'Inventory Report',
        component: InventoryReportComponent
    },
    savings: {
        path: 'savings-report',
        title: 'Savings Report',
        component: SavingsReportComponent
    },
    sensor: {
        path: 'sensor-report',
        title: 'Sensor Report',
        component: SensorReportComponent
    },
    waste: {
        path: 'waste-report',
        title: 'Waste Report',
        component: WasteReportComponent
    },
    temphumid: {
        path: 'temphumid-report',
        title: 'Temperature Report',
        component: TemphumidReportComponent
    }
}
