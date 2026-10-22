export type Profile = 'aluno' | 'responsavel' | 'motorista';

export type DashboardTab = 'inicio' | 'rota' | 'avisos';

export interface DemoAccount {
  profile: Profile;
  username: string;
  password: string;
}
