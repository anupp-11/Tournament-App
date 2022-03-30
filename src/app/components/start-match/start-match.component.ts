import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupModel } from 'src/app/models/groups.model';
import { MatchModel } from 'src/app/models/match.model';
import { TeamModel } from 'src/app/models/team.model';
import { GroupsService } from 'src/app/services/groups.service';
import { MatchService } from 'src/app/services/matches.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-start-match',
  templateUrl: './start-match.component.html',
  styleUrls: ['./start-match.component.scss']
})
export class StartMatchComponent implements OnInit {

  name: string;
  team: any = {};
  id:string;
  group : GroupModel;
  formGroup: FormGroup;
  isProcessing: boolean = false;
  constructor(formBuilder: FormBuilder,
    public route : ActivatedRoute,
    public groupService :GroupsService,
    public matchService :MatchService,
    public teamService: TeamsService,
    private router: Router) {}

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
    try {
      this.isProcessing = true;
      this.group = await this.groupService.getGroup(id);
      this.dataSource = new MatTableDataSource(this.group.teams);
      this.isProcessing = false;
    } catch (error) {
      this.isProcessing = false;
      console.log(error);
    }
  }
  // async onSubmit() {
  //   const match :MatchModel={
  //     id:"",
  //     name:this.name,
  //     groups:[this.group]
  //   }

  //   const resp = await this.matchService.addMatch(match);
  //   console.log("Updated Group",this.group);
  //   debugger;
    
  // }

  async onStart() {
    const match :MatchModel={
      id:"",
      name:this.name,
      groups:[this.group]
    }
    try {
      this.isProcessing = true;
      const resp = await this.matchService.addMatch(match);
      this.isProcessing = false;
      this.router.navigate(['/ingame',resp.id]);
    debugger;
    } catch (error) {
      this.isProcessing = false;
      console.log(error);
    }
  }
}
