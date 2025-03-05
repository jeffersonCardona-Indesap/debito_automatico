import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, ConfirmAlert } from '../models/Alerts';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  alertSettings = new Subject<Alert>();
  confirmAlertSettings = new Subject<ConfirmAlert>();

  constructor() { }

  show(type: string, title: string, content: string, isHtmlContent?: boolean) {
    this.alertSettings.next({
      type, title, content, isHtmlContent
    });
  }

  showConfirm(type: string, title: string, content: string, confirm: () => void, cancel?: () => void, isHtmlContent?: boolean) {
    this.confirmAlertSettings.next({
      type, title, content, isHtmlContent, confirm, cancel
    });
  }
}
