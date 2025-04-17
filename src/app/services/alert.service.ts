import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertMessageSource = new BehaviorSubject<string | null>(null);
  private alertTypeSource = new BehaviorSubject<string>('success');

  alertMessage$ = this.alertMessageSource.asObservable();
  alertType$ = this.alertTypeSource.asObservable();

  showSuccess(message: string | any): void {
    this.alertTypeSource.next('success');
    this.alertMessageSource.next(message);
  }

  showError(message: string): void {
    this.alertTypeSource.next('danger');
    this.alertMessageSource.next(message);
  }

  clearAlert(): void {
    this.alertMessageSource.next(null);
  }
}
