import { Routes } from '@angular/router'

import { DonationReportComponent } from './donation-report/donation-report.component'
import { EthyleneReportComponent } from './ethylene-report/ethylene-report.component'
import { FlashSaleReportComponent } from './flash-sale-report/flash-sale-report.component'
import { InventoryReportComponent } from './inventory-report/inventory-report.component'
import { SavingsReportComponent } from './savings-report/savings-report.component'
import { SensorReportComponent } from './sensor-report/sensor-report.component'
import { WasteReportComponent } from './waste-report/waste-report.component'
import { TemphumidReportComponent } from './temphumid-report/temphumid-report.component'
import { RevenueReportComponent } from './revenue-report/revenue-report.component'

export const ReportsRoutes = {
    donate: {
        path: 'donate-report',
        title: 'Donation Report',
        component: DonationReportComponent
    },
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
    revenue: {
        path: 'revenue-report',
        title: 'Revenue Report',
        component: RevenueReportComponent
    },
    savings: {
        path: 'savings-report',
        title: 'Savings Report',
        component: SavingsReportComponent
    },
    waste: {
        path: 'waste-report',
        title: 'Waste Report',
        component: WasteReportComponent
    }
}
