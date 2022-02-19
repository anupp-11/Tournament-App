import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMessageComponent } from '../alert-message/alert-message.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(public snackBar: MatSnackBar) {}

  showNotification(displayMessage:any){
    this.snackBar.openFromComponent(AlertMessageComponent,{
      data:{
        message: displayMessage
      },
      duration:5000,
      horizontalPosition:'left',
      verticalPosition:'bottom',
      panelClass:'domination'
    });
  }

  // showFirstBloodNotification(displayMessage:any){
  //   this.snackBar.openFromComponent(AlertMessageComponent,{
  //     data:{
  //       message: displayMessage
  //     },
  //     duration:5000,
  //     horizontalPosition:'left',
  //     verticalPosition:'bottom',
  //     panelClass:'domination'
  //   });
  // }
}
