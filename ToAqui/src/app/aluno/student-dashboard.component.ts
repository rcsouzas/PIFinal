import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { DashboardTab } from '../auth/profile';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
  standalone: false,
})
export class StudentDashboardComponent implements OnInit {
  activeTab: DashboardTab = 'inicio';
  absenceReported = false;
  proximityAlertEnabled = false;
  checkInQrDataUrl = '';
  qrError = '';

  get studentOnboard(): boolean {
    return !this.absenceReported;
  }

  ngOnInit(): void {
    void this.generateCheckInQr();
  }

  get title(): string {
    if (this.activeTab === 'rota') return 'Detalhes da sua viagem';
    if (this.activeTab === 'avisos') return 'Seus avisos';
    return 'Olá, Mariana!';
  }

  get subtitle(): string {
    return this.activeTab === 'inicio'
      ? 'Confira como será o caminho até a escola hoje.'
      : 'Informações demonstrativas do seu transporte escolar.';
  }

  toggleAbsenceReport(): void {
    this.absenceReported = !this.absenceReported;
  }

  toggleProximityAlert(): void {
    this.proximityAlertEnabled = !this.proximityAlertEnabled;
  }

  private async generateCheckInQr(): Promise<void> {
    try {
      this.checkInQrDataUrl = await QRCode.toDataURL('toaqui://demo/rota-01/aluno-04', {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 176,
      });
    } catch {
      this.qrError = 'Não foi possível gerar o QR Code demonstrativo. Tente recarregar a página.';
    }
  }
}
