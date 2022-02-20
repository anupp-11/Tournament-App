import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  teamLogo:string 
  teams: any;
  constructor(
    public dialogRef: MatDialogRef<TeamFormComponent>,
    public service: TeamsService,
    public notificationService: NotificationService
  ) {
    this.teamLogo = "";
    debugger;
    this.teams = [];
  }

  ngOnInit() {
    this.service.teamForm;
    debugger;
  }

  fileChangeEvent(fileInput: any) {
  
    if (fileInput.target.files && fileInput.target.files[0]) {
        

        

      
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                
                    const imgBase64Path = e.target.result;
                    this.teamLogo = imgBase64Path;
                   
                    // this.previewImagePath = imgBase64Path;
                
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
    if (!this.service.teamForm.get('id').value){
      
      this.addTeam(this.team);
      this.notificationService.success('Team Added Successfully');
      console.log("Add Vitra");
    } else {
      console.log("Inside update");
      this.editTeam(this.team);
      this.notificationService.success('Team Updated Successfully');
    }  
    this.onClose();
    //this.displayBuyers();
  }

  addSkillButtonClick(): void {
    (<FormArray>this.service.teamForm.get('players')).push(this.service.addPlayerFormGroup());
  }
  
  async editTeam(team:TeamModel){
    const response = await this.service.editTeam(this.service.teamForm.get('id').value,team);
    console.log("Edit Team Response",response);
  }

  async addTeam(team: TeamModel) {
    const response = await this.service.addTeam(team);
    console.log("Add Team Response", response);
  }
}
