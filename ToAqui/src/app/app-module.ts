import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { StudentDashboardComponent } from './aluno/student-dashboard.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './cadastro/signup.component';
import { DriverDashboardComponent } from './motorista/driver-dashboard.component';
import { ParentDashboardComponent } from './responsavel/parent-dashboard.component';
import { OperationsComponent } from './operacao/operations.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    App,
    LoginComponent,
    SignupComponent,
    DashboardLayoutComponent,
    StudentDashboardComponent,
    ParentDashboardComponent,
    DriverDashboardComponent,
    OperationsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
