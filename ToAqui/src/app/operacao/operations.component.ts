import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {
  BoardingStatus,
  Driver,
  DriverDraft,
  Guardian,
  GuardianDraft,
  Student,
  StudentDraft,
  TransportDataService,
  Trip,
  TripDraft,
  TripStatus,
  Vehicle,
  VehicleDraft,
} from './transport-data';

type OperationsSection =
  'resumo' | 'alunos' | 'responsaveis' | 'motoristas' | 'veiculos' | 'viagens';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss',
  standalone: false,
})
export class OperationsComponent {
  section: OperationsSection = 'resumo';
  editId: string | null = null;
  message = '';
  error = '';

  studentForm: StudentDraft = this.emptyStudent();
  guardianForm: GuardianDraft = this.emptyGuardian();
  driverForm: DriverDraft = this.emptyDriver();
  vehicleForm: VehicleDraft = this.emptyVehicle();
  tripForm: TripDraft = this.emptyTrip();

  readonly sections: { id: OperationsSection; label: string }[] = [
    { id: 'resumo', label: 'Dashboard' },
    { id: 'alunos', label: 'Alunos' },
    { id: 'responsaveis', label: 'Responsáveis' },
    { id: 'motoristas', label: 'Motoristas' },
    { id: 'veiculos', label: 'Veículos' },
    { id: 'viagens', label: 'Viagens' },
  ];

  constructor(
    readonly data: TransportDataService,
    readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/']);
  }

  selectSection(section: OperationsSection): void {
    this.section = section;
    this.resetForm();
    this.clearFeedback();
  }

  saveGuardian(): void {
    this.perform(
      () => this.data.saveGuardian(this.guardianForm, this.editId ?? undefined),
      'Responsável salvo.',
    );
  }

  editGuardian(guardian: Guardian): void {
    this.editId = guardian.id;
    this.guardianForm = { name: guardian.name, phone: guardian.phone, email: guardian.email };
  }

  deleteGuardian(guardian: Guardian): void {
    this.perform(() => this.data.deleteGuardian(guardian.id), 'Responsável excluído.');
  }

  saveStudent(): void {
    this.perform(
      () => this.data.saveStudent(this.studentForm, this.editId ?? undefined),
      'Aluno salvo.',
    );
  }

  editStudent(student: Student): void {
    this.editId = student.id;
    this.studentForm = {
      name: student.name,
      school: student.school,
      grade: student.grade,
      guardianId: student.guardianId,
    };
  }

  deleteStudent(student: Student): void {
    this.perform(() => this.data.deleteStudent(student.id), 'Aluno excluído.');
  }

  saveDriver(): void {
    this.perform(
      () => this.data.saveDriver(this.driverForm, this.editId ?? undefined),
      'Motorista salvo.',
    );
  }

  editDriver(driver: Driver): void {
    this.editId = driver.id;
    this.driverForm = { name: driver.name, phone: driver.phone, license: driver.license };
  }

  deleteDriver(driver: Driver): void {
    this.perform(() => this.data.deleteDriver(driver.id), 'Motorista excluído.');
  }

  saveVehicle(): void {
    this.perform(
      () => this.data.saveVehicle(this.vehicleForm, this.editId ?? undefined),
      'Veículo salvo.',
    );
  }

  editVehicle(vehicle: Vehicle): void {
    this.editId = vehicle.id;
    this.vehicleForm = { plate: vehicle.plate, model: vehicle.model, capacity: vehicle.capacity };
  }

  deleteVehicle(vehicle: Vehicle): void {
    this.perform(() => this.data.deleteVehicle(vehicle.id), 'Veículo excluído.');
  }

  saveTrip(): void {
    this.perform(
      () => this.data.saveTrip(this.tripForm, this.editId ?? undefined),
      'Viagem salva.',
    );
  }

  editTrip(trip: Trip): void {
    this.editId = trip.id;
    this.tripForm = {
      name: trip.name,
      date: trip.date,
      departureTime: trip.departureTime,
      arrivalTime: trip.arrivalTime,
      driverId: trip.driverId,
      vehicleId: trip.vehicleId,
      studentIds: [...trip.studentIds],
      status: trip.status,
    };
  }

  deleteTrip(trip: Trip): void {
    this.perform(() => this.data.deleteTrip(trip.id), 'Viagem excluída.');
  }

  updateAttendance(trip: Trip, studentId: string): void {
    const currentStatus = trip.attendance[studentId] ?? 'aguardando';
    const nextStatus: BoardingStatus =
      currentStatus === 'aguardando'
        ? 'a-bordo'
        : currentStatus === 'a-bordo'
          ? 'desembarcou'
          : 'aguardando';
    this.perform(
      () => this.data.setAttendance(trip.id, studentId, nextStatus),
      'Presença atualizada.',
    );
  }

  updateTripStatus(trip: Trip, status: TripStatus): void {
    this.perform(() => this.data.setTripStatus(trip.id, status), 'Status da viagem atualizado.');
  }

  statusLabel(status: TripStatus): string {
    return { planejada: 'Planejada', 'em-andamento': 'Em andamento', concluida: 'Concluída' }[
      status
    ];
  }

  attendanceLabel(status: BoardingStatus | undefined): string {
    return { aguardando: 'Aguardando', 'a-bordo': 'A bordo', desembarcou: 'Desembarcou' }[
      status ?? 'aguardando'
    ];
  }

  cancelEdit(): void {
    this.resetForm();
    this.clearFeedback();
  }

  private perform(action: () => void, successMessage: string): void {
    this.clearFeedback();
    try {
      action();
      this.message = successMessage;
      this.resetForm();
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Não foi possível concluir a operação.';
    }
  }

  private resetForm(): void {
    this.editId = null;
    this.studentForm = this.emptyStudent();
    this.guardianForm = this.emptyGuardian();
    this.driverForm = this.emptyDriver();
    this.vehicleForm = this.emptyVehicle();
    this.tripForm = this.emptyTrip();
  }

  private clearFeedback(): void {
    this.message = '';
    this.error = '';
  }

  private emptyStudent(): StudentDraft {
    return { name: '', school: '', grade: '', guardianId: '' };
  }

  private emptyGuardian(): GuardianDraft {
    return { name: '', phone: '', email: '' };
  }

  private emptyDriver(): DriverDraft {
    return { name: '', phone: '', license: '' };
  }

  private emptyVehicle(): VehicleDraft {
    return { plate: '', model: '', capacity: 12 };
  }

  private emptyTrip(): TripDraft {
    return {
      name: '',
      date: new Date().toISOString().slice(0, 10),
      departureTime: '07:00',
      arrivalTime: '07:50',
      driverId: '',
      vehicleId: '',
      studentIds: [],
      status: 'planejada',
    };
  }
}
