import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DashboardTab, Profile } from '../auth/profile';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  standalone: false,
})
export class DashboardLayoutComponent {
  @Input({ required: true }) profile!: Profile;
  @Input({ required: true }) activeTab!: DashboardTab;
  @Input({ required: true }) title = '';
  @Input({ required: true }) subtitle = '';
  @Output() tabChange = new EventEmitter<DashboardTab>();

  lastUpdate = new Date();

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    readonly theme: ThemeService,
  ) {}

  get profileName(): string {
    return {
      aluno: 'Aluno',
      responsavel: 'Responsável',
      motorista: 'Motorista',
    }[this.profile];
  }

  get username(): string {
    return this.auth.username;
  }

  get todayLabel(): string {
    return new Date()
      .toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
      .toLocaleUpperCase('pt-BR');
  }

  get lastUpdateLabel(): string {
    return this.lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  selectTab(tab: DashboardTab): void {
    this.lastUpdate = new Date();
    this.tabChange.emit(tab);
  }

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/']);
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
