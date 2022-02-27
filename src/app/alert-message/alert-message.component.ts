import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SettingsService } from '../services/settings.services';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  msg :String;
  settings : any = {};
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any,public settingService: SettingsService){}


  async ngOnInit() {
    const response = await this.settingService.get();
    if(response){
      this.settings = response;
    }
    if(this.data.message.type=="DOMINATION"){
      this.msg= "DOMINATION";
      setTimeout(() => {
        this.msg = this.data.message.playerName + " - 3 KILLS";
      }, 2500);
    }else if(this.data.message.type=="FIRSTBLOOD"){
      this.msg= "FIRST BLOOD";
      setTimeout(() => {
        this.msg = this.data.message.playerName;
      }, 2500);
    }else if(this.data.message.type=="TEAMELIMINATED"){
      this.msg= "ELIMINATED";
    }
    

  }

  getUrl()
  {
    let url = `url(${this.settings.dominationBgImage})`;
    return url;
  }

}
