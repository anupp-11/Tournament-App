import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  msg :String;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any){}


  ngOnInit() {
    if(this.data.message.type=="DOMINATION"){
      this.msg= "DOMINATION";
      setTimeout(() => {
        this.msg = this.data.message.playerName + " - 3 KILLS";
      }, 2500);
    }else{
      this.msg= "FIRST BLOOD";
      setTimeout(() => {
        this.msg = this.data.message.playerName;
      }, 2500);
    }
    

  }

}
