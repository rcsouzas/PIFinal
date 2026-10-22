import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DriverDashboardComponent } from './motorista/driver-dashboard.component';
import { ParentDashboardComponent } from './responsavel/parent-dashboard.component';
import { StudentDashboardComponent } from './aluno/student-dashboard.component';
import { profileGuard } from './auth/profile.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'aluno',
    component: StudentDashboardComponent,
    canActivate: [profileGuard],
    data: { profile: 'aluno' },
  },
  {
    path: 'responsavel',
    component: ParentDashboardComponent,
    canActivate: [profileGuard],
    data: { profile: 'responsavel' },
  },
  {
    path: 'motorista',
    component: DriverDashboardComponent,
    canActivate: [profileGuard],
    data: { profile: 'motorista' },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
