import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GroupModel } from '../models/groups.model';
import { TeamModel } from '../models/team.model';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrls: ['./in-game.component.scss']
})
export class InGameComponent implements OnInit {

  id:string;
  group : GroupModel;
  kills:number=0;

  constructor(public route : ActivatedRoute,public groupService :GroupsService,) { }

  dataSource: MatTableDataSource<TeamModel>;
  displayedColumns: string[] = ['id', 'name', 'players'];

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
     this.id = params['id'];
     });
     this.getGroup(this.id);
  }

  async getGroup(id:string){
    this.group = await this.groupService.getGroup(id);
    this.dataSource = new MatTableDataSource(this.group.teams);
    console.log("Group:", this.group);
  }

  incrementKill(){
    this.kills += 1;
    console.log(this.kills + 1);
    }
    
    //decrements item
    
    decrementKill(){
    if(this.kills-1 < 1){
      this.kills = 1;
      console.log('item_1->' + this.kills)
    }
    else{
      this.kills -= 1;
      console.log('item_2->' + this.kills);
    }
    }

}
