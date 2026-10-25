import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { vi } from 'vitest';
import { AuthService } from '../auth/auth.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let router: Router;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule.forRoot([])],
      declarations: [SignupComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  it('creates an account and navigates to its selected profile', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const component = fixture.componentInstance;
    component.name = 'Ana Souza';
    component.email = 'ana.signup@example.com';
    component.profile = 'aluno';
    component.password = 'senha-segura';
    component.confirmPassword = 'senha-segura';

    component.onSignup();

    expect(navigateSpy).toHaveBeenCalledWith(['aluno']);
    expect(TestBed.inject(AuthService).displayName).toBe('Ana Souza');
  });

  it('shows an error and does not create an account when passwords differ', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const component = fixture.componentInstance;
    component.name = 'Ana Souza';
    component.email = 'ana.mismatch@example.com';
    component.password = 'senha-segura';
    component.confirmPassword = 'senha-diferente';

    component.onSignup();

    expect(component.message).toBe('As senhas não coincidem.');
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(TestBed.inject(AuthService).profile).toBeNull();
  });

  it('shows an error when the email is already registered', () => {
    const auth = TestBed.inject(AuthService);
    auth.register('responsavel', 'Ana Souza', 'ana.duplicate@example.com', 'senha-segura');
    auth.logout();
    const fixture = TestBed.createComponent(SignupComponent);
    const component = fixture.componentInstance;
    component.name = 'Outra Ana';
    component.email = 'ANA.DUPLICATE@example.com';
    component.password = 'outra-senha';
    component.confirmPassword = 'outra-senha';

    component.onSignup();

    expect(component.message).toBe('Este e-mail já está cadastrado.');
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
