import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { StudentDashboardComponent } from './aluno/student-dashboard.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout.component';
import { LoginComponent } from './login/login.component';
import { DriverDashboardComponent } from './motorista/driver-dashboard.component';
import { ParentDashboardComponent } from './responsavel/parent-dashboard.component';

@NgModule({
  declarations: [
    App,
    LoginComponent,
    DashboardLayoutComponent,
    StudentDashboardComponent,
    ParentDashboardComponent,
    DriverDashboardComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
