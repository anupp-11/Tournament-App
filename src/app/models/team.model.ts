export class TeamModel {
  id:string;
  fullName: string;
  shortName: string;
  teamLogo:string;
  kills:number;
  players: Player[];
  isEliminated:Boolean;
  isEliminatedMsg:Boolean;
  eliminationOrder:number;
}

export class Player{
  id:string;
  playerName:string;
  isAlive:boolean;
  isPlaying:boolean;
  kills:number;
  domination:boolean;
}
export class ResponseModel{
  result:any;
}

export class SettingModel {
  id:string;
  aliveCounterBgImage: string;
  dominationBgImage: string;
  eliminatedBgImage: string;
  primaryColor: string;
  secondaryColor: string;
  aliveColor: string;
  deadColor: string;
}