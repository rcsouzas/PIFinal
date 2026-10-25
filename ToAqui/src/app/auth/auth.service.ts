import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { DEMO_ACCOUNTS } from './demo-credentials';

interface RegisteredAccount {
  profile: Profile;
  username: string;
  password: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private activeProfile: Profile | null = null;
  private activeUsername = '';
  private activeName = '';
  private readonly registeredAccounts: RegisteredAccount[] = [];

  get profile(): Profile | null {
    return this.activeProfile;
  }

  get username(): string {
    return this.activeUsername;
  }

  get displayName(): string {
    return this.activeName;
  }

  login(profile: Profile, username: string, password: string): boolean {
    const normalizedUsername = username.trim().toLowerCase();
    const matchesCredentials = (item: {
      profile: Profile;
      username: string;
      password: string;
    }) =>
      item.profile === profile &&
      item.username === normalizedUsername &&
      item.password === password;
    const registeredAccount = this.registeredAccounts.find(matchesCredentials);
    const demoAccount = DEMO_ACCOUNTS.find(matchesCredentials);
    const account = registeredAccount ?? demoAccount;

    if (!account) {
      return false;
    }

    this.activeProfile = account.profile;
    this.activeUsername = account.username;
    this.activeName = registeredAccount?.name ?? account.username;
    return true;
  }

  register(profile: Profile, name: string, username: string, password: string): boolean {
    const normalizedUsername = username.trim().toLowerCase();
    const alreadyExists = [...DEMO_ACCOUNTS, ...this.registeredAccounts].some(
      (account) => account.username === normalizedUsername,
    );

    if (alreadyExists) {
      return false;
    }

    const account: RegisteredAccount = {
      profile,
      username: normalizedUsername,
      password,
      name: name.trim(),
    };
    this.registeredAccounts.push(account);
    this.activeProfile = account.profile;
    this.activeUsername = account.username;
    this.activeName = account.name;
    return true;
  }

  logout(): void {
    this.activeProfile = null;
    this.activeUsername = '';
    this.activeName = '';
  }
}
