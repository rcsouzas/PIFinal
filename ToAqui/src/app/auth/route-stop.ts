export type BoardingStatus = 'Aguardando embarque' | 'A bordo' | 'Desembarcou';

export interface RouteStop {
  student: string;
  address: string;
  time: string;
  status: BoardingStatus;
}
