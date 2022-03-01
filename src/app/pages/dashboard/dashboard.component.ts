import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { SettingsService } from 'src/app/services/settings.services';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  aliveImg: string;
  dominationImg: string;
  eliminatedImg: string;
  setting: any = {};
  settings: any = {};
  isProcessing: boolean;
  constructor(
    public service: SettingsService,
    public notificationService: NotificationService
  ) {
    this.isProcessing=true;
    this.aliveImg = "";
    this.dominationImg = "";
    this.eliminatedImg = "";
  }
  async ngOnInit() {
    try {
      this.isProcessing = true;
      const response = await this.service.get();
      console.log("Response", response);
      if (response) {
        console.log("Response", response);
        this.settings = response;
        this.service.populateForm(this.settings);
        this.isProcessing = false;
      }

    } catch (error) {
      console.log(error);
      this.isProcessing = false;
    }
  }



  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.aliveImg = imgBase64Path;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }
  fileChangeEvent2(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.dominationImg = imgBase64Path;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }
  fileChangeEvent3(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.eliminatedImg = imgBase64Path;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }

  async onSubmit() {


    this.setting = Object.assign(this.setting, this.service.settingForm.value);
    this.setting.aliveCounterBgImage = this.aliveImg;
    this.setting.dominationBgImage = this.dominationImg;
    this.setting.eliminatedBgImage = this.eliminatedImg;
    const c = this.setting;
    console.log("Settings", c);
    const response = await this.service.addSetting(this.setting);
    console.log("Response", response);

    // if (!this.service.settingForm.get('id').value) {

    //   this.addTeam(this.team);
    //   this.notificationService.success('Team Added Successfully');
    //   console.log("Add Vitra");
    // } else {
    //   console.log("Inside update");
    //   this.editTeam(this.team);
    //   this.notificationService.success('Team Updated Successfully');
    // }

  }




}
