import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GroupModel } from 'src/app/models/groups.model';
import { TeamModel } from 'src/app/models/team.model';
import { GroupsService } from 'src/app/services/groups.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  name: string;
  isProcessing : boolean = false;
  isAdding : boolean = false;
  objectKeys = Object.keys;
  constructor(private dialog:MatDialog,
    public teamService :TeamsService,
    public groupService : GroupsService,
    public notificationService : NotificationService) { }

  dataSource: MatTableDataSource<TeamModel>;
  displayedColumns: string[] = ['id', 'fullName', 'shortName','players','button'];
  teamList : TeamModel[];
  teams : Array<TeamModel>=[];
  len = -1;
  ngOnInit() {
    
    this.displayTable();
  }

  async displayTable(){
    this.isProcessing = true;
    this.teamList = await this.teamService.getAll();
    this.isProcessing = false;
    this.dataSource = new MatTableDataSource(this.teamList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddTeams(team:TeamModel){
    this.teams.push(team)
    this.len = this.teams.length;
  }
  removeTeam(key:number){
    if (key !== -1) {
      this.teams.splice(key, 1);
    }
  }

  async onSubmit(){
    this.isAdding = true;
    const data : GroupModel = {
      name : this.name,
      teams : this.teams
    };
    this.groupService.addGroup(data);
    this.isAdding = false;
    this.notificationService.success('Group Created Successfully');
  }
  

  

}
