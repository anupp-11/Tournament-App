import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GroupModel } from 'src/app/models/groups.model';
import { TeamModel } from 'src/app/models/team.model';
import { GroupsService } from 'src/app/services/groups.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-start-match',
  templateUrl: './start-match.component.html',
  styleUrls: ['./start-match.component.scss']
})
export class StartMatchComponent implements OnInit {

  team: any = {};
  id:string;
  group : GroupModel;
  formGroup: FormGroup;
  constructor(formBuilder: FormBuilder,public route : ActivatedRoute,public groupService :GroupsService,public teamService: TeamsService) {
    this.formGroup = formBuilder.group({
      playing: ['',],
    });
   }

  dataSource: MatTableDataSource<TeamModel>;
  displayedColumns: string[] = ['id', 'name', 'players'];

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
     this.id = params['id'];
     });
    this.getGroup(this.id);
  }

  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }

  async getGroup(id:string){
    this.group = await this.groupService.getGroup(id);
    this.dataSource = new MatTableDataSource(this.group.teams);
    console.log("Group:", this.group);
  }
  onSubmit() {
    
    //this.team = Object.assign(this.team, this.teamService.teamForm.value);
    console.log("Updated Group",this.group);
    debugger;
    
  }
}
