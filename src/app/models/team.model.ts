export class TeamModel {
  id:string;
  fullName: string;
  shortName: string;
  teamLogo:string;
  kills:string;
  players: Player[];
}

export class Player{
  id:string;
  playerName:string;
  isAlive:boolean;
  isPlaying:boolean;
  kills:string;
}
export class ResponseModel{
  result:any;
}