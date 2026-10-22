import { Component } from '@angular/core';
import { DashboardTab } from '../auth/profile';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
  standalone: false,
})
export class StudentDashboardComponent {
  activeTab: DashboardTab = 'inicio';
  readonly studentOnboard = true;

  get title(): string {
    if (this.activeTab === 'rota') return 'Detalhes da sua viagem';
    if (this.activeTab === 'avisos') return 'Seus avisos';
    return 'Olá, Mariana!';
  }

  get subtitle(): string {
    return this.activeTab === 'inicio'
      ? 'Confira como será o caminho até a escola hoje.'
      : 'Informações demonstrativas do seu transporte escolar.';
  }
}
