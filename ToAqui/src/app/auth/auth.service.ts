import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { DEMO_ACCOUNTS } from './demo-credentials';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private activeProfile: Profile | null = null;
  private activeUsername = '';

  get profile(): Profile | null {
    return this.activeProfile;
  }

  get username(): string {
    return this.activeUsername;
  }

  login(profile: Profile, username: string, password: string): boolean {
    const normalizedUsername = username.trim().toLowerCase();
    const account = DEMO_ACCOUNTS.find(
      (item) =>
        item.profile === profile &&
        item.username === normalizedUsername &&
        item.password === password,
    );

    if (!account) {
      return false;
    }

    this.activeProfile = account.profile;
    this.activeUsername = account.username;
    return true;
  }

  logout(): void {
    this.activeProfile = null;
    this.activeUsername = '';
  }
}
