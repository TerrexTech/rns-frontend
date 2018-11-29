import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { AddComponent } from './inventory/add/add.component'
import { EmployeeRoutes } from './employee/employee.routes'
import { InventoryRoutes } from './inventory/inventory.routes'
import { ReportsRoutes } from './reports/reports.routes'
import { MonitoringRoutes } from './monitoring/monitoring.routing'
import { WarningComponent } from './warning/warning.component'
import { ViewFlashsaleComponent } from './flash-sale/view-flashsale/view-flashsale.component'
import { DonateDisposeRoutes } from './donate-dispose/donate-dispose.routes'
import { CarbonComponent } from './monitoring/carbon/carbon.component'
import { FlashSaleRoutes } from './flash-sale/flash-sale.routes'

export const AppRoutes = {
  root: {
    path: '',
    title: 'Dashboard',
    component: DashboardComponent
  },

  dashboard: {
    title: 'Dashboard',
    path: 'dashboard',
    component: DashboardComponent
  },

  employee: {
    title: 'Employees',
    path: 'employee',
    children: EmployeeRoutes
  },

  inventory: {
    path: 'inventory',
    title: 'Inventory',
    children: InventoryRoutes
  },

  reports: {
    path: 'reports',
    title: 'Reports',
    children: ReportsRoutes
  },

  monitoring: {
    path: 'monitoring',
    title: 'Monitoring',
    children: MonitoringRoutes
  },

  login: {
    path: 'login',
    title: 'Login',
    isPublic: true,
    component: LoginPageComponent
  },

  flashsale: {
    path: 'flash-sales',
    title: 'Flash-Sales',
    children: FlashSaleRoutes
  },

  donatedispose: {
    path: 'donate-dispose',
    title: 'Donate-Dispose',
    children: DonateDisposeRoutes
  },

  warning: {
    path: 'warning',
    title: 'Warnings',
    component: WarningComponent
  }
}
