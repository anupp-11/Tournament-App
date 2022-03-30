import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupModel } from '../models/groups.model';
import { ResponseModel } from '../models/team.model';

export interface IGroupsService {
  addGroup(team: GroupModel): Promise<ResponseModel>;
  editGroup(id: string, team: GroupModel): Promise<GroupModel>;
  getGroup(id: string): Promise<GroupModel>;
  getAll(): Promise<GroupModel[]>;
  deleteGroup(id: string): Promise<GroupModel>;
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService implements IGroupsService{

  constructor(private httpClient: HttpClient) { }

  addGroup = async (team: GroupModel): Promise<ResponseModel> => {
    const response = await this.httpClient
      .post<ResponseModel>(
        'https://tournament-pubg.herokuapp.com/Group/add',
        team
      )
      .toPromise();
    return response;
  };

  getGroup = async (id: string): Promise<GroupModel> => {
    const response = await this.httpClient
      .get<ResponseModel>(
        'https://tournament-pubg.herokuapp.com/Group/get-by-id/' + id
      )
      .toPromise();
    return response.result;
  };

  getAll = async (): Promise<GroupModel[]> => {
    const response = await this.httpClient
      .get<ResponseModel>('https://tournament-pubg.herokuapp.com/Group/get-all')
      .toPromise();
    return response.result;
  };

  deleteGroup = async (id: string): Promise<GroupModel> => {
    const response = await this.httpClient
      .get<GroupModel>(
        `https://tournament-pubg.herokuapp.com/Group/delete/${id}`)
      .toPromise();
    return response;
  };

  editGroup = async (id: string, team: GroupModel): Promise<GroupModel> => {
    const response = await this.httpClient
      .post<GroupModel>(
        'https://tournament-pubg.herokuapp.com/Group/update/' + id,
        team
      )
      .toPromise();
    return response;
  };
 
}
