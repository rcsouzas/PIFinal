import { TestBed } from '@angular/core/testing';
import { TransportDataService } from './transport-data';

describe('TransportDataService', () => {
  let data: TransportDataService;

  beforeEach(() => {
    localStorage.removeItem('toaqui.transport-data.v1');
    TestBed.configureTestingModule({});
    data = TestBed.inject(TransportDataService);
  });

  afterEach(() => localStorage.removeItem('toaqui.transport-data.v1'));

  it('updates operational indicators as a trip starts and students board', () => {
    const trip = data.trips()[0];

    data.setTripStatus(trip.id, 'em-andamento');
    data.setAttendance(trip.id, trip.studentIds[0], 'a-bordo');

    expect(data.activeTrips()).toBe(1);
    expect(data.studentsOnboard()).toBe(1);
    expect(data.availableSeats()).toBe(11);
  });

  it('rejects trips that exceed vehicle capacity and protects linked records', () => {
    const trip = data.trips()[0];
    expect(() =>
      data.saveTrip(
        {
          ...trip,
          studentIds: Array.from({ length: 13 }, (_, index) => `student-${index}`),
        },
        trip.id,
      ),
    ).toThrow('A quantidade de alunos excede a capacidade do veículo.');
    expect(() => data.deleteStudent('student-1')).toThrow('O aluno participa de uma viagem.');
  });

  it('creates, relates, edits and removes guardian and student records', () => {
    data.saveGuardian({ name: 'Beatriz Lima', phone: '41999990000', email: 'beatriz@exemplo.com' });
    const guardian = data.guardians().find((item) => item.email === 'beatriz@exemplo.com');
    if (!guardian) throw new Error('Responsável não foi cadastrado.');

    data.saveStudent({
      name: 'Lucas Lima',
      school: 'Escola Horizonte',
      grade: '4º ano',
      guardianId: guardian.id,
    });
    const student = data.students().find((item) => item.name === 'Lucas Lima');
    if (!student) throw new Error('Aluno não foi cadastrado.');
    expect(data.guardianStudentCount(guardian.id)).toBe(1);

    data.saveStudent({ ...student, grade: '5º ano' }, student.id);
    expect(data.students().find((item) => item.id === student.id)?.grade).toBe('5º ano');
    expect(localStorage.getItem('toaqui.transport-data.v1')).toContain('Lucas Lima');

    data.deleteStudent(student.id);
    data.deleteGuardian(guardian.id);
    expect(data.students().some((item) => item.id === student.id)).toBe(false);
    expect(data.guardians().some((item) => item.id === guardian.id)).toBe(false);
  });
});
