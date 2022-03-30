import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchModel } from '../models/match.model';
import { ResponseModel } from '../models/team.model';

export interface IMatchsService {
  addMatch(match: MatchModel): Promise<MatchModel>;
  editMatch(id: string, match: MatchModel): Promise<MatchModel>;
  getMatch(id: string): Promise<MatchModel>;
  getAll(): Promise<MatchModel[]>;
  deleteMatch(id: string): Promise<MatchModel>;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService implements IMatchsService{

  constructor(private httpClient: HttpClient) { }

  addMatch = async (match: MatchModel): Promise<MatchModel> => {
    const response = await this.httpClient
      .post<ResponseModel>(
        'https://tournament-pubg.herokuapp.com/Match/add',
        match
      )
      .toPromise();
    return response.result;
  };

  getMatch = async (id: string): Promise<MatchModel> => {
    const response = await this.httpClient
      .get<ResponseModel>(
        'https://tournament-pubg.herokuapp.com/Match/get-by-id/' + id
      )
      .toPromise();
    return response.result;
  };

  getAll = async (): Promise<MatchModel[]> => {
    const response = await this.httpClient
      .get<ResponseModel>('https://tournament-pubg.herokuapp.com/Match/get-all')
      .toPromise();
    return response.result;
  };

  deleteMatch = async (id: string): Promise<MatchModel> => {
    const response = await this.httpClient
      .delete<MatchModel>(
        'https://tournament-pubg.herokuapp.com/Match/delete/' + id
      )
      .toPromise();
    return response;
  };

  editMatch = async (id: string, match: MatchModel): Promise<MatchModel> => {
    const response = await this.httpClient
      .post<MatchModel>(
        'https://tournament-pubg.herokuapp.com/Match/update',
        match
      )
      .toPromise();
    return response;
  };
 
}
