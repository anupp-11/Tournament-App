import { GroupModel } from "./groups.model";
import { TeamModel } from "./team.model";

export class MatchModel{
  id:string;
  name: string;
  groups:GroupModel[]
}
// export class ResponseModel{
//   result: GroupModel
// }
