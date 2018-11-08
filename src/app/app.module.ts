import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgModule } from '@angular/core'
import { LoginPageModule } from './login-page/login-page.module'
import { EmployeeModule } from './employee/employee.module'
import { InventoryModule } from './inventory/inventory.module'
import { ReportsModule } from './reports/reports.module'
import { SidebarModule } from './sidebar/sidebar.module'
import { FooterModule } from './shared/footer/footer.module'
import { NavbarModule } from './shared/navbar/navbar.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component'
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component'
import { AppRoutingModule } from './app.routing'
import { AuthGuard } from './_Auth/auth.guard'
import { TokenService } from './_Auth/token.service'
import { MonitoringModule } from './monitoring/monitoring.module'
import { FlashSaleModule } from './flash-sale/flash-sale.module'
import { WarningModule } from './warning/warning.module'
import { DonateDisposeModule } from './donate-dispose/donate-dispose.module'

// Font-Awesome
import fontawesome from '@fortawesome/fontawesome'
import {
  faLemon
} from '@fortawesome/fontawesome-free-solid'

import { AppRoutes } from './app.routes'

import { AppContainer } from './App/app.component'

// Add Font-Awesome being used icons here
fontawesome.library.add(
  faLemon
)

// Angular Material
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
import { AlertService } from './alert-popup/alert.service'
import { AlertPopupModule } from './alert-popup/alert-popup.module'

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AppContainer,
    AuthLayoutComponent
  ],
  imports: [
    AlertPopupModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DashboardModule,
    EmployeeModule,
    FormsModule,
    FlashSaleModule,
    HttpClientModule,
    InventoryModule,
    HttpModule,
    NgbModule.forRoot(),
    LoginPageModule,
    ReportsModule,
    SidebarModule,
    FooterModule,
    MonitoringModule,
    NavbarModule,
    // Material Components Here
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
    MatTabsModule,
    ReactiveFormsModule,
    WarningModule,
    DonateDisposeModule
  ],
  providers: [
    AuthGuard,
    AlertService
  ],
  bootstrap: [AppContainer]
})
export class AppModule {}
