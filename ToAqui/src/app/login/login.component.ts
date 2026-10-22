import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DEMO_ACCOUNTS } from '../auth/demo-credentials';
import { DemoAccount, Profile } from '../auth/profile';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false,
})
export class LoginComponent {
  readonly demoAccounts: readonly DemoAccount[] = DEMO_ACCOUNTS;
  profile: Profile = 'responsavel';
  username = '';
  password = '';
  showPassword = false;
  loginMessage = '';

  profileLabel(profile: Profile): string {
    return {
      aluno: 'Aluno',
      responsavel: 'Responsável',
      motorista: 'Motorista',
    }[profile];
  }

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    readonly theme: ThemeService,
  ) {}

  onLogin(): void {
    if (!this.auth.login(this.profile, this.username, this.password)) {
      this.loginMessage = 'Usuário ou senha incorretos para o perfil selecionado.';
      return;
    }

    void this.router.navigate([this.profile]);
  }

  showHelp(): void {
    this.loginMessage =
      'Acesso de demonstração: escolha o perfil e confira as contas de teste mostradas nesta página.';
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
