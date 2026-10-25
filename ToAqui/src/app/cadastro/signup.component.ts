import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../auth/profile';
import { AuthService } from '../auth/auth.service';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: false,
})
export class SignupComponent {
  name = '';
  email = '';
  profile: Profile = 'responsavel';
  password = '';
  confirmPassword = '';
  message = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    readonly theme: ThemeService,
  ) {}

  onSignup(): void {
    this.message = '';
    if (this.password !== this.confirmPassword) {
      this.message = 'As senhas não coincidem.';
      return;
    }

    if (!this.auth.register(this.profile, this.name, this.email, this.password)) {
      this.message = 'Este e-mail já está cadastrado.';
      return;
    }

    void this.router.navigate([this.profile]);
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
