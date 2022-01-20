import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  ) {
    debugger;
    this.teams=[];
   }

  ngOnInit() {

    this.service.teamForm;
    debugger;
  }
  onClose(){
    const a = this.service.teamForm;
    console.log(a);
    debugger;
    this.dialogRef.close();
  }

  onSubmit() {
    console.log("Submitted",this.service.teamForm.value);
    this.team = Object.assign(this.team, this.service.teamForm.value);
    console.log(this.team);
    if (!this.service.teamForm.get('$key').value){
      
      this.addBuyers(this.team);
      //this.notificationService.success('Buyer Info Added');
      console.log("Add Vitra");
    }
    else{
      console.log("Inside update");
      //this.updateData(this.team);
      //this.notificationService.success('Buyer Info Updated');
    }  
    this.onClose();
    //this.displayBuyers();
  }

  addBuyers(team){
    
    if(localStorage.getItem('teamdatas')){
      this.teams=JSON.parse(localStorage.getItem('teamdatas'));
      //this.dataSource = new MatTableDataSource(this.teams);
      team.$key = this.teams.length;
      this.teams=[team, ...this.teams];
    }else{
      
      this.teams = [team];
    }
    localStorage.setItem('teamdatas', JSON.stringify(this.teams));
  }

}
