import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamModel } from '../models/team.model';

export interface ITeamsService {
  addTeam(team: TeamModel): Promise<TeamModel>;
  editTeam(id: string, team: TeamModel): Promise<TeamModel>;
  getTeam(id: string): Promise<TeamModel>;
  getAll(): Promise<TeamModel[]>;
  deleteTeam(id: string): Promise<TeamModel>;
}

@Injectable({
  providedIn: 'root'
})
export class TeamsService implements ITeamsService{

  constructor(private fb : FormBuilder,private httpClient: HttpClient) { }

  teamForm = this.fb.group({
    id: ["",[Validators.required, this.isValid]],
    fullName: ["",[Validators.required, this.isValid]],
    shortName: ["",[Validators.required, this.isValid]],
    kills: ["",[]],
    players : this.fb.array([
      this.addPlayerFormGroup()
    ])  
  });

  addPlayerFormGroup(): FormGroup{
    return this.fb.group({
      playerName : ['',[]],
      isAlive : ["",[]],
      isPlaying: ["",[]],
      kills : ["",[]]
    })
  }
  addTeam = async (team: TeamModel): Promise<TeamModel> => {
    const response = await this.httpClient
      .post<TeamModel>(
        'https://610c159c66dd8f0017b76c6d.mockapi.io/teams',
        team
      )
      .toPromise();
    return response;
  };

  getTeam = async (id: string): Promise<TeamModel> => {
    const response = await this.httpClient
      .get<TeamModel>(
        'https://610c159c66dd8f0017b76c6d.mockapi.io/teams/' + id
      )
      .toPromise();
    return response;
  };

  getAll = async (): Promise<TeamModel[]> => {
    const response = await this.httpClient
      .get<TeamModel[]>('https://610c159c66dd8f0017b76c6d.mockapi.io/teams')
      .toPromise();
    return response;
  };

  deleteTeam = async (id: string): Promise<TeamModel> => {
    const response = await this.httpClient
      .delete<TeamModel>(
        'https://610c159c66dd8f0017b76c6d.mockapi.io/teams/' + id
      )
      .toPromise();
    return response;
  };

  editTeam = async (id: string, team: TeamModel): Promise<TeamModel> => {
    const response = await this.httpClient
      .put<TeamModel>(
        'https://610c159c66dd8f0017b76c6d.mockapi.io/teams/' + id,
        team
      )
      .toPromise();
    return response;
  };
 
 isValid(control: FormControl){
  if (control.value<1) {
    return { inValid: true };
  }
  return null;
 }

 populateForm(team){
  this.teamForm.setValue(team);
}
}
