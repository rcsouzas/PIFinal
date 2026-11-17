import { Injectable, computed, signal } from '@angular/core';

export type TripStatus = 'planejada' | 'em-andamento' | 'concluida';
export type BoardingStatus = 'aguardando' | 'a-bordo' | 'desembarcou';

export interface Guardian {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Student {
  id: string;
  name: string;
  school: string;
  grade: string;
  guardianId: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  capacity: number;
}

export interface Trip {
  id: string;
  name: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  driverId: string;
  vehicleId: string;
  studentIds: string[];
  attendance: Record<string, BoardingStatus>;
  status: TripStatus;
}

export type GuardianDraft = Omit<Guardian, 'id'>;
export type StudentDraft = Omit<Student, 'id'>;
export type DriverDraft = Omit<Driver, 'id'>;
export type VehicleDraft = Omit<Vehicle, 'id'>;
export type TripDraft = Omit<Trip, 'id' | 'attendance'>;

interface TransportData {
  guardians: Guardian[];
  students: Student[];
  drivers: Driver[];
  vehicles: Vehicle[];
  trips: Trip[];
}

const STORAGE_KEY = 'toaqui.transport-data.v1';

function createDemoData(): TransportData {
  return {
    guardians: [
      { id: 'guardian-1', name: 'Ana Costa', phone: '(41) 99999-1001', email: 'ana@exemplo.com' },
    ],
    students: [
      {
        id: 'student-1',
        name: 'Mariana Costa',
        school: 'Escola Horizonte',
        grade: '5º ano',
        guardianId: 'guardian-1',
      },
    ],
    drivers: [
      { id: 'driver-1', name: 'Carlos Oliveira', phone: '(41) 99999-2001', license: 'CNH 12345' },
    ],
    vehicles: [{ id: 'vehicle-1', plate: 'ABC1D23', model: 'Van escolar', capacity: 12 }],
    trips: [
      {
        id: 'trip-1',
        name: 'Rota da manhã',
        date: new Date().toISOString().slice(0, 10),
        departureTime: '07:00',
        arrivalTime: '07:50',
        driverId: 'driver-1',
        vehicleId: 'vehicle-1',
        studentIds: ['student-1'],
        attendance: { 'student-1': 'aguardando' },
        status: 'planejada',
      },
    ],
  };
}

@Injectable({ providedIn: 'root' })
export class TransportDataService {
  private readonly data = signal<TransportData>(this.loadData());

  readonly guardians = computed(() => this.data().guardians);
  readonly students = computed(() => this.data().students);
  readonly drivers = computed(() => this.data().drivers);
  readonly vehicles = computed(() => this.data().vehicles);
  readonly trips = computed(() => this.data().trips);

  readonly activeTrips = computed(
    () => this.data().trips.filter((trip) => trip.status === 'em-andamento').length,
  );
  readonly studentsOnboard = computed(() =>
    this.data()
      .trips.filter((trip) => trip.status === 'em-andamento')
      .reduce(
        (total, trip) =>
          total + Object.values(trip.attendance).filter((status) => status === 'a-bordo').length,
        0,
      ),
  );
  readonly availableSeats = computed(() => {
    const totalCapacity = this.data().vehicles.reduce(
      (total, vehicle) => total + vehicle.capacity,
      0,
    );
    return Math.max(0, totalCapacity - this.studentsOnboard());
  });

  saveGuardian(draft: GuardianDraft, id?: string): void {
    const current = this.data();
    const guardians = id
      ? current.guardians.map((guardian) => (guardian.id === id ? { ...draft, id } : guardian))
      : [...current.guardians, { ...draft, id: this.createId('guardian') }];
    this.commit({ ...current, guardians });
  }

  deleteGuardian(id: string): void {
    if (this.data().students.some((student) => student.guardianId === id)) {
      throw new Error('Remova ou altere o responsável dos alunos vinculados antes de excluir.');
    }
    const current = this.data();
    this.commit({ ...current, guardians: current.guardians.filter((item) => item.id !== id) });
  }

  saveStudent(draft: StudentDraft, id?: string): void {
    this.requireExists(
      this.data().guardians,
      draft.guardianId,
      'Selecione um responsável cadastrado.',
    );
    const current = this.data();
    const students = id
      ? current.students.map((student) => (student.id === id ? { ...draft, id } : student))
      : [...current.students, { ...draft, id: this.createId('student') }];
    this.commit({ ...current, students });
  }

  deleteStudent(id: string): void {
    if (this.data().trips.some((trip) => trip.studentIds.includes(id))) {
      throw new Error('O aluno participa de uma viagem. Remova-o da viagem antes de excluir.');
    }
    const current = this.data();
    this.commit({ ...current, students: current.students.filter((item) => item.id !== id) });
  }

  saveDriver(draft: DriverDraft, id?: string): void {
    const current = this.data();
    const drivers = id
      ? current.drivers.map((driver) => (driver.id === id ? { ...draft, id } : driver))
      : [...current.drivers, { ...draft, id: this.createId('driver') }];
    this.commit({ ...current, drivers });
  }

  deleteDriver(id: string): void {
    if (this.data().trips.some((trip) => trip.driverId === id)) {
      throw new Error('O motorista está vinculado a uma viagem. Altere a viagem antes de excluir.');
    }
    const current = this.data();
    this.commit({ ...current, drivers: current.drivers.filter((item) => item.id !== id) });
  }

  saveVehicle(draft: VehicleDraft, id?: string): void {
    if (!Number.isInteger(draft.capacity) || draft.capacity < 1) {
      throw new Error('A capacidade do veículo deve ser um número inteiro maior que zero.');
    }
    const current = this.data();
    if (
      current.trips.some((trip) => trip.vehicleId === id && trip.studentIds.length > draft.capacity)
    ) {
      throw new Error(
        'A capacidade não pode ser menor que a quantidade de alunos de uma viagem vinculada.',
      );
    }
    const vehicles = id
      ? current.vehicles.map((vehicle) => (vehicle.id === id ? { ...draft, id } : vehicle))
      : [...current.vehicles, { ...draft, id: this.createId('vehicle') }];
    this.commit({ ...current, vehicles });
  }

  deleteVehicle(id: string): void {
    if (this.data().trips.some((trip) => trip.vehicleId === id)) {
      throw new Error('O veículo está vinculado a uma viagem. Altere a viagem antes de excluir.');
    }
    const current = this.data();
    this.commit({ ...current, vehicles: current.vehicles.filter((item) => item.id !== id) });
  }

  saveTrip(draft: TripDraft, id?: string): void {
    const current = this.data();
    const driver = this.requireExists(
      current.drivers,
      draft.driverId,
      'Selecione um motorista cadastrado.',
    );
    const vehicle = this.requireExists(
      current.vehicles,
      draft.vehicleId,
      'Selecione um veículo cadastrado.',
    );
    if (draft.studentIds.length === 0) {
      throw new Error('Adicione ao menos um aluno à viagem.');
    }
    if (new Set(draft.studentIds).size !== draft.studentIds.length) {
      throw new Error('Não é possível adicionar o mesmo aluno mais de uma vez à viagem.');
    }
    if (draft.studentIds.length > vehicle.capacity) {
      throw new Error('A quantidade de alunos excede a capacidade do veículo.');
    }
    for (const studentId of draft.studentIds) {
      this.requireExists(current.students, studentId, 'A viagem contém um aluno não cadastrado.');
    }
    const conflictingTrip = current.trips.find(
      (trip) =>
        trip.id !== id &&
        trip.date === draft.date &&
        trip.status === 'em-andamento' &&
        (trip.driverId === driver.id || trip.vehicleId === vehicle.id),
    );
    if (draft.status === 'em-andamento' && conflictingTrip) {
      throw new Error(
        'Motorista ou veículo já está alocado a outra viagem em andamento nesta data.',
      );
    }

    const previousTrip = id ? current.trips.find((trip) => trip.id === id) : undefined;
    const attendance: Record<string, BoardingStatus> = {};
    for (const studentId of draft.studentIds) {
      attendance[studentId] = previousTrip?.attendance[studentId] ?? 'aguardando';
    }
    const trip: Trip = {
      ...draft,
      id: id ?? this.createId('trip'),
      studentIds: [...draft.studentIds],
      attendance,
    };
    const trips = id
      ? current.trips.map((item) => (item.id === id ? trip : item))
      : [...current.trips, trip];
    this.commit({ ...current, trips });
  }

  deleteTrip(id: string): void {
    const current = this.data();
    this.commit({ ...current, trips: current.trips.filter((item) => item.id !== id) });
  }

  setAttendance(tripId: string, studentId: string, status: BoardingStatus): void {
    const current = this.data();
    const trip = current.trips.find((item) => item.id === tripId);
    if (!trip || !trip.studentIds.includes(studentId)) {
      throw new Error('Não foi possível localizar o aluno nesta viagem.');
    }
    const trips = current.trips.map((item) =>
      item.id === tripId
        ? { ...item, attendance: { ...item.attendance, [studentId]: status } }
        : item,
    );
    this.commit({ ...current, trips });
  }

  setTripStatus(tripId: string, status: TripStatus): void {
    const current = this.data();
    const trip = current.trips.find((item) => item.id === tripId);
    if (!trip) throw new Error('Não foi possível localizar a viagem.');
    this.saveTrip({ ...trip, status }, tripId);
  }

  guardianName(id: string): string {
    return (
      this.data().guardians.find((guardian) => guardian.id === id)?.name ??
      'Responsável não encontrado'
    );
  }

  guardianStudentCount(id: string): number {
    return this.data().students.filter((student) => student.guardianId === id).length;
  }

  driverName(id: string): string {
    return (
      this.data().drivers.find((driver) => driver.id === id)?.name ?? 'Motorista não encontrado'
    );
  }

  vehicleLabel(id: string): string {
    const vehicle = this.data().vehicles.find((item) => item.id === id);
    return vehicle ? `${vehicle.model} · ${vehicle.plate}` : 'Veículo não encontrado';
  }

  studentName(id: string): string {
    return (
      this.data().students.find((student) => student.id === id)?.name ?? 'Aluno não encontrado'
    );
  }

  private loadData(): TransportData {
    if (typeof localStorage === 'undefined') return createDemoData();
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as TransportData) : createDemoData();
  }

  private commit(data: TransportData): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    this.data.set(data);
  }

  private createId(prefix: string): string {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }

  private requireExists<T extends { id: string }>(items: T[], id: string, message: string): T {
    const item = items.find((value) => value.id === id);
    if (!item) throw new Error(message);
    return item;
  }
}
