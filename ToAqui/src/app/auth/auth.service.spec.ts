import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { DEMO_ACCOUNTS } from './demo-credentials';

describe('AuthService', () => {
  let auth: AuthService;

  beforeEach(() => {
    auth = TestBed.inject(AuthService);
    auth.logout();
  });

  it('accepts the account assigned to each profile', () => {
    for (const account of DEMO_ACCOUNTS) {
      expect(auth.login(account.profile, account.username, account.password)).toBe(true);
      expect(auth.profile).toBe(account.profile);
    }
  });

  it('rejects a username when it does not match the selected profile', () => {
    const [student, parent] = DEMO_ACCOUNTS;
    expect(auth.login(student.profile, parent.username, parent.password)).toBe(false);
    expect(auth.profile).toBeNull();
  });

  it('clears the active profile on logout', () => {
    const parent = DEMO_ACCOUNTS.find((account) => account.profile === 'responsavel');
    if (!parent) throw new Error('A conta de demonstração do responsável não foi configurada.');
    auth.login(parent.profile, parent.username, parent.password);
    auth.logout();

    expect(auth.profile).toBeNull();
    expect(auth.username).toBe('');
    expect(auth.displayName).toBe('');
  });

  it('registers an account and allows it to log in', () => {
    expect(auth.register('responsavel', 'Ana Souza', 'ana@example.com', 'senha-segura')).toBe(
      true,
    );
    expect(auth.profile).toBe('responsavel');
    expect(auth.displayName).toBe('Ana Souza');

    auth.logout();
    expect(auth.login('responsavel', 'ANA@example.com', 'senha-segura')).toBe(true);
    expect(auth.displayName).toBe('Ana Souza');
  });

  it('rejects duplicate usernames regardless of case', () => {
    expect(auth.register('aluno', 'Ana Souza', 'ana@example.com', 'senha-segura')).toBe(true);
    expect(auth.register('aluno', 'Outra Ana', 'ANA@example.com', 'outra-senha')).toBe(false);
  });
});
