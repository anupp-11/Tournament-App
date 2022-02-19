import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  constructor() { }
  public isVisible: boolean = false;
  alertText;
  alerts = {
      'success': {
        msg: `success. (added: ${new Date().toLocaleTimeString()})`,
        timeout: 5000
      },
      'info': {
        msg: `info. (added: ${new Date().toLocaleTimeString()})`,
        timeout: 5000
      }
    };

  showAlert(type) : void {
    if (this.isVisible) { 
      return;
    } 
    this.alertText = this.alerts[type].msg;
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false, this.alerts[type].timeout)
  }
}