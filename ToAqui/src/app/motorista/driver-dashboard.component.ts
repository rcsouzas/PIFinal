import { Component } from '@angular/core';
import { DashboardTab } from '../auth/profile';
import { RouteStop } from '../auth/route-stop';

interface TripNotice {
  title: string;
  detail: string;
  time: string;
}

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.scss',
  standalone: false,
})
export class DriverDashboardComponent {
  activeTab: DashboardTab = 'inicio';
  lastUpdate = new Date();

  readonly routeStops: RouteStop[] = [
    { student: 'Mariana Costa', address: 'Rua das Acácias, 120', time: '07:10', status: 'A bordo' },
    {
      student: 'Pedro Almeida',
      address: 'Av. Central, 845',
      time: '07:20',
      status: 'Aguardando embarque',
    },
    {
      student: 'Luiza Santos',
      address: 'Rua do Ipê, 32',
      time: '07:32',
      status: 'Aguardando embarque',
    },
    {
      student: 'Escola Horizonte',
      address: 'Rua das Flores, 500',
      time: '07:50',
      status: 'Aguardando embarque',
    },
  ];

  readonly notifications: TripNotice[] = [
    { title: 'Viagem iniciada', detail: 'O transporte saiu para buscar os alunos.', time: '07:00' },
    { title: 'Mariana embarcou', detail: 'Embarque registrado no ponto combinado.', time: '07:10' },
    { title: 'Próxima parada', detail: 'Av. Central, 845 · previsão 07:20.', time: '07:16' },
  ];

  get title(): string {
    if (this.activeTab === 'rota') return 'Sua rota de hoje';
    if (this.activeTab === 'avisos') return 'Avisos da viagem';
    return 'Olá, Carlos!';
  }

  get subtitle(): string {
    return this.activeTab === 'inicio'
      ? 'Uma visão prática das paradas e dos embarques do dia.'
      : 'Consulte e atualize as informações demonstrativas da rota.';
  }

  get occupancyCount(): number {
    return this.routeStops.filter((stop) => stop.status === 'A bordo').length;
  }

  get lastUpdateLabel(): string {
    return this.lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  updateStop(stop: RouteStop): void {
    stop.status = stop.status === 'Aguardando embarque' ? 'A bordo' : 'Desembarcou';
    this.lastUpdate = new Date();
    this.notifications.unshift({
      title: `${stop.student} ${stop.status === 'A bordo' ? 'embarcou' : 'desembarcou'}`,
      detail: `${stop.address} · registro feito pelo motorista.`,
      time: this.lastUpdateLabel,
    });
  }
}
