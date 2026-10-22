import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { vi } from 'vitest';
import { AuthService } from '../auth/auth.service';
import { DEMO_ACCOUNTS } from '../auth/demo-credentials';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let router: Router;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule.forRoot([])],
      declarations: [LoginComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  it('shows account details from the central demo credentials list', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    for (const account of DEMO_ACCOUNTS) {
      expect(text).toContain(account.username);
    }
  });

  it('routes the user to the selected profile after a valid login', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    const account = DEMO_ACCOUNTS.find((item) => item.profile === 'aluno');
    if (!account) throw new Error('A conta de demonstração do aluno não foi configurada.');

    component.profile = account.profile;
    component.username = account.username;
    component.password = account.password;
    component.onLogin();

    expect(navigateSpy).toHaveBeenCalledWith([account.profile]);
  });

  it('shows a message and stays on login for invalid credentials', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    component.profile = 'aluno';
    component.username = 'usuario-incorreto';
    component.password = 'senha-incorreta';
    component.onLogin();

    expect(component.loginMessage).toContain('incorretos');
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(TestBed.inject(AuthService).profile).toBeNull();
  });
});
