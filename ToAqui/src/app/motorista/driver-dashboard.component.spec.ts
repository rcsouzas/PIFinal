import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '../dashboard/dashboard-layout.component';
import { AuthService } from '../auth/auth.service';
import { DEMO_ACCOUNTS } from '../auth/demo-credentials';
import { DriverDashboardComponent } from './driver-dashboard.component';

describe('DriverDashboardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule.forRoot([])],
      declarations: [DriverDashboardComponent, DashboardLayoutComponent],
    }).compileComponents();
  });

  it('updates boarding status, occupancy and notifications', () => {
    const fixture = TestBed.createComponent(DriverDashboardComponent);
    const dashboard = fixture.componentInstance;
    const studentStop = dashboard.routeStops[0];

    expect(dashboard.occupancyCount).toBe(1);
    dashboard.updateStop(studentStop);

    expect(studentStop.status).toBe('Desembarcou');
    expect(dashboard.occupancyCount).toBe(0);
    expect(dashboard.notifications[0].title).toContain('desembarcou');
  });

  it('renders the assigned account in the shared dashboard header', () => {
    const auth = TestBed.inject(AuthService);
    const driver = DEMO_ACCOUNTS.find((account) => account.profile === 'motorista');
    if (!driver) throw new Error('A conta de demonstração do motorista não foi configurada.');
    auth.login(driver.profile, driver.username, driver.password);
    const fixture = TestBed.createComponent(DriverDashboardComponent);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(driver.username);
  });
});
