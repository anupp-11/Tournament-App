


export class TeamModel{
  fullName: string;
  shortName: string;
  kills:string;
  players: Player[];
}

export class Player{
  playerName:string;
  isAlive:boolean;
  isPlaying:boolean;
  kills:string;
}

