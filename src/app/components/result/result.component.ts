import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert-message/alert.service';
import { MatchModel } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/matches.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {


  id: string;
  match: MatchModel;
  subscription: Subscription;
  flag:boolean;
  updated:boolean;
  matchUpdated:  MatchModel;

  constructor(public route: ActivatedRoute, 
    public matchService: MatchService,
    public sport: AlertService,
    private notifierService: NotifierService) { 
    this.flag=true;
    this.updated=false;
  }

  ngOnInit(): void {
    const sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.getMatch(this.id));
    
    
    
  }

  async getMatch(id: string) {
    this.match = await this.matchService.getMatch(id);
    this.eliminateTeamCheck();
    if(this.flag){
      this.firstBlood();
    }
    if(!this.updated){
      this.matchUpdated=this.match;
      this.updated = true;
    } 

    this.threeKills();
  }
  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
  eliminateTeamCheck(){
    this.match.groups[0].teams = this.match.groups[0].teams.sort((a,b)=>{
      if(a.isEliminated&&b.isEliminated){
        return b.eliminationOrder-a.eliminationOrder;
      }else{
        return + a.isEliminated- + b.isEliminated;
      }
      
    });
  }
  getTotalKills(teamId){
    let kills = 0;
    this.match.groups[0].teams[teamId].players.forEach(x => {
      kills= kills+ x.kills
    });
    return kills;
  }
  firstBlood() {
    this.match.groups[0].teams.forEach((element, index) => {
      let team = element.players.forEach((player, pIndex) => {
        if (player.kills > 0) {
           console.log("First Blood", element.fullName, player.playerName);
           this.alertMsg(element.fullName, player.playerName,"FIRSTBLOOD");
           this.flag=false;
          }
      })
    });
  }

  threeKills() {
    this.match.groups[0].teams.forEach((element, index) => {
      let team = element.players.forEach((player, pIndex) => {
        if (player.kills == 3 && !this.matchUpdated.groups[0].teams[index].players[pIndex].domination) {
          console.log("Domination", element.fullName, player.playerName);
          this.alertMsg(element.fullName, player.playerName,"DOMINATION");
          //  this.match.groups[0].teams[index].players[pIndex].domination=true;

          this.matchUpdated.groups[0].teams[index].players[pIndex].domination = true;
        }
      })
    });
  }

  alertMsg(teamName,playerName,type){
    const msg = {
      teamName : teamName,
      playerName : playerName,
      type:type
    }
    this.notifierService.showNotification(msg);
    // this.sport.showAlert('success');
  }

  getUrl()
{
  return "url('assets/img/alive.png')";
}

}
