import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { AddComponent } from './inventory/add/add.component'
import { EmployeeRoutes } from './employee/employee.routes'
import { InventoryRoutes } from './inventory/inventory.routes'
import { ReportsRoutes } from './reports/reports.routes'
import { MonitoringRoutes } from './monitoring/monitoring.routing'
import { FlashSaleRoutes } from './flash-sale/flash-sale.routes'
import { WarningComponent } from './warning/warning.component'

export const AppRoutes = {
  root: {
    path: '',
    title: 'Dashboard',
    component: DashboardComponent
  },

  dashboard: {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent
  },

  employee: {
    title: 'Employees',
    path: 'employee/show-employees',
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

  warning: {
    path: 'warning',
    title: 'Warnings',
    component: WarningComponent
  }
}
