import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Profile } from './profile';

function isProfile(value: unknown): value is Profile {
  return value === 'aluno' || value === 'responsavel' || value === 'motorista';
}

export const profileGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedProfile = route.data['profile'];

  return isProfile(expectedProfile) && auth.profile === expectedProfile
    ? true
    : router.parseUrl('/');
};
