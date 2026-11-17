export type Profile = 'aluno' | 'responsavel' | 'monitor' | 'admin';
export type SignupProfile = Exclude<Profile, 'admin'>;

export type DashboardTab = 'inicio' | 'rota' | 'avisos';

export interface DemoAccount {
  profile: Profile;
  username: string;
  password: string;
}
