import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TeamModel } from 'src/app/models/team.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  team: any = {};
  teams : any;
  constructor(
    public dialogRef: MatDialogRef<TeamFormComponent>,
    public service: TeamsService,
    public notificationService : NotificationService
  ) {
    debugger;
    this.teams=[];
   }

  ngOnInit() {

    this.service.teamForm;
    debugger;
  }
  onClose(){
    
    this.dialogRef.close();
  }

  onSubmit() {
    this.team = Object.assign(this.team, this.service.teamForm.value);
    debugger;
    if (!this.service.teamForm.get('id').value){
      
      this.addTeam(this.team);
      this.notificationService.success('Team Added Successfully');
      console.log("Add Vitra");
    }
    else{
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

  async addTeam(team:TeamModel){
    const response = await this.service.addTeam(team);
    console.log("Add Team Response",response);
  }
}
