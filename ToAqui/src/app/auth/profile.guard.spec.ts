import { TestBed } from '@angular/core/testing';
import { Router, RouterModule, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { DEMO_ACCOUNTS } from './demo-credentials';
import { adminGuard } from './profile.guard';

describe('adminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterModule.forRoot([])] });
  });

  it('rejects users who are not signed in as Admin', () => {
    const auth = TestBed.inject(AuthService);
    const monitor = DEMO_ACCOUNTS.find((account) => account.profile === 'monitor');
    if (!monitor) throw new Error('A conta de demonstração do monitor não foi configurada.');
    auth.login(monitor.profile, monitor.username, monitor.password);

    const router = TestBed.inject(Router);
    const snapshot = router.routerState.snapshot;
    const result = TestBed.runInInjectionContext(() => adminGuard(snapshot.root, snapshot));

    if (!(result instanceof UrlTree))
      throw new Error('O perfil Monitor não deveria acessar a central.');
    expect(router.serializeUrl(result)).toBe('/');
  });

  it('allows the dedicated Admin account', () => {
    const auth = TestBed.inject(AuthService);
    const admin = DEMO_ACCOUNTS.find((account) => account.profile === 'admin');
    if (!admin) throw new Error('A conta de demonstração Admin não foi configurada.');
    auth.login(admin.profile, admin.username, admin.password);

    const router = TestBed.inject(Router);
    const snapshot = router.routerState.snapshot;
    const result = TestBed.runInInjectionContext(() => adminGuard(snapshot.root, snapshot));

    expect(result).toBe(true);
  });
});
