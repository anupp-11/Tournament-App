import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxImageCompressService } from 'ngx-image-compress';
import { TeamModel } from 'src/app/models/team.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: "app-team-form",
  templateUrl: "./team-form.component.html",
  styleUrls: ["./team-form.component.scss"],
})
export class TeamFormComponent implements OnInit {
  team: any = {};
  teamLogo: string
  teams: any;

  isProcessing: boolean;
  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;


  constructor(
    public dialogRef: MatDialogRef<TeamFormComponent>,
    public service: TeamsService,
    public notificationService: NotificationService,
    private imageCompress: NgxImageCompressService
  ) {
    this.teamLogo = "";
    this.isProcessing=false;
    this.teams = [];
  }

  ngOnInit() {
    this.service.teamForm;
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.teamLogo = imgBase64Path;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }


  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.team = Object.assign(this.team, this.service.teamForm.value);
    this.team.teamLogo = this.teamLogo;
    debugger;
    if (!this.service.teamForm.get('id').value) {
      this.addTeam(this.team);
    } else {
      console.log("Inside update");
      this.editTeam(this.team);
      this.notificationService.success('Team Updated Successfully');
    }
  }

  addSkillButtonClick(): void {
    (<FormArray>this.service.teamForm.get('players')).push(this.service.addPlayerFormGroup());
  }

  async editTeam(team: TeamModel) {
    const response = await this.service.editTeam(this.service.teamForm.get('id').value, team);
    console.log("Edit Team Response", response);
    this.onClose();
  }

  async addTeam(team: TeamModel) {
    try {
      this.isProcessing = true;
      const response = await this.service.addTeam(team);
      if(response.isSuccess){
        this.isProcessing = false;
        this.notificationService.success('Team Added Successfully');
        this.service.teamForm.reset();
        this.onClose();
      }else{
        this.isProcessing = false;
        this.notificationService.warn('Team Registration Failed. Please try again');
      }
    } catch (error) {
      this.isProcessing = false;
      this.notificationService.warn('Team Registration Failed. Please try again');
      console.log("Error", error);
    }
  }
}
