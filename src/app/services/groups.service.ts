import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupModel } from '../models/groups.model';

export interface IGroupsService {
  addGroup(team: GroupModel): Promise<GroupModel>;
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

  addGroup = async (team: GroupModel): Promise<GroupModel> => {
    const response = await this.httpClient
      .post<GroupModel>(
        'https://610c159c66dd8f0017b76c6d.mockapi.io/group',
        team
      )
      .toPromise();
    return response;
  };

  getGroup = async (id: string): Promise<GroupModel> => {
    const response = await this.httpClient
      .get<GroupModel>(
        'https://610c159c66dd8f0017b76c6d.mockapi.io/group/' + id
      )
      .toPromise();
    return response;
  };

  getAll = async (): Promise<GroupModel[]> => {
    const response = await this.httpClient
      .get<GroupModel[]>('https://610c159c66dd8f0017b76c6d.mockapi.io/group')
      .toPromise();
    return response;
  };

  deleteGroup = async (id: string): Promise<GroupModel> => {
    const response = await this.httpClient
      .delete<GroupModel>(
        'https://610c159c66dd8f0017b76c6d.mockapi.io/group/' + id
      )
      .toPromise();
    return response;
  };

  editGroup = async (id: string, team: GroupModel): Promise<GroupModel> => {
    const response = await this.httpClient
      .put<GroupModel>(
        'https://610c159c66dd8f0017b76c6d.mockapi.io/group/' + id,
        team
      )
      .toPromise();
    return response;
  };
 
}
