import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GroupModel } from '../models/groups.model';
import { MatchModel } from '../models/match.model';
import { TeamModel } from '../models/team.model';
import { GroupsService } from '../services/groups.service';
import { MatchService } from '../services/matches.service';

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrls: ['./in-game.component.scss']
})
export class InGameComponent implements OnInit {

  id: string;
  match: MatchModel;
  //kills:number=0;
  order:number;
  constructor(public route: ActivatedRoute, public matchService: MatchService,) {
    this.order = 1
   }

  dataSource: MatTableDataSource<TeamModel>;
  displayedColumns: string[] = ['id', 'name', 'players'];
  isProcessing: boolean = false;
  

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    
    console.log("ID", this.id);
    this.getMatch(this.id);
  }

  async getMatch(id: string) {
    this.match = await this.matchService.getMatch(id);
    this.dataSource = new MatTableDataSource(this.match.groups[0].teams);
    console.log("Group:", this.match);
  }

  incrementKill(teamId, playerId) {
    this.match.groups[0].teams[teamId].players[playerId].kills++;
    this.updateMatch();
  }



  decrementKill(teamId, playerId) {
    if (this.match.groups[0].teams[teamId].players[playerId].kills > 0) {
      this.match.groups[0].teams[teamId].players[playerId].kills--;
    }

    this.updateMatch();
  }
  async toggleAlive(){
    this.match.groups[0].teams.forEach((element,index) => {
      let aliveTeam = element.players.some(x=> x.isAlive && x.isPlaying );

      if(!aliveTeam && !element.isEliminated){

        this.match.groups[0].teams[index].isEliminated=true;
      
        this.match.groups[0].teams[index].eliminationOrder = this.order;
        this.order++;
      
      }
    });
    await this.updateMatch();
  }

  async updateMatch(){
    this.isProcessing = true;
    const resp = await this.matchService.editMatch(this.match.id, this.match);
    this.isProcessing = false;
  }
}
