import { Component } from '@angular/core';
import { DashboardTab } from '../auth/profile';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrl: './parent-dashboard.component.scss',
  standalone: false,
})
export class ParentDashboardComponent {
  activeTab: DashboardTab = 'inicio';
  readonly studentOnboard = true;

  get title(): string {
    if (this.activeTab === 'rota') return 'A viagem da Mariana';
    if (this.activeTab === 'avisos') return 'Avisos e atualizações';
    return 'Olá, família!';
  }

  get subtitle(): string {
    return this.activeTab === 'inicio'
      ? 'Acompanhe cada etapa do trajeto escolar.'
      : 'Informações demonstrativas da viagem de hoje.';
  }
}
