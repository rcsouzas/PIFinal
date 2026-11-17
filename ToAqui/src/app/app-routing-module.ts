import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './cadastro/signup.component';
import { DriverDashboardComponent } from './motorista/driver-dashboard.component';
import { ParentDashboardComponent } from './responsavel/parent-dashboard.component';
import { StudentDashboardComponent } from './aluno/student-dashboard.component';
import { adminGuard, profileGuard } from './auth/profile.guard';
import { OperationsComponent } from './operacao/operations.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: SignupComponent },
  { path: 'operacao', component: OperationsComponent, canActivate: [adminGuard] },
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
    path: 'monitor',
    component: DriverDashboardComponent,
    canActivate: [profileGuard],
    data: { profile: 'monitor' },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
