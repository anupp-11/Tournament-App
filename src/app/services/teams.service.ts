import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseModel, TeamModel } from '../models/team.model';

export interface ITeamsService {
  addTeam(team: TeamModel): Promise<TeamModel>;
  editTeam(id: string, team: TeamModel): Promise<TeamModel>;
  getTeam(id: string): Promise<TeamModel>;
  getAll(): Promise<TeamModel[]>;
  deleteTeam(id: string): Promise<TeamModel>;
}

@Injectable({
  providedIn: "root",
})
export class TeamsService implements ITeamsService {
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  teamForm = this.fb.group({
    id: [null,[]],
    fullName: ["",[Validators.required, this.isValid]],
    shortName: ["",[Validators.required, this.isValid]],
    teamLogo: ["",[]],
    kills: [0,[]],
    isEliminated:false,
    isEliminatedMsg:false,
    eliminationOrder:0,
    players : this.fb.array([
      this.addPlayerFormGroup()
    ])  
  });

  addPlayerFormGroup(): FormGroup{
    return this.fb.group({
      id: [null,[]],
      playerName : ['',[]],
      isAlive : [true,[]],
      isPlaying: [true,[]],
      kills : [0,[]],
      domination: [false,[]],
    })
  }
  addTeam = async (team: TeamModel): Promise<TeamModel> => {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const response = await this.httpClient
      .post<TeamModel>("https://localhost:5001/Team/add", team, {headers: headers})
      .toPromise();
    return response;
  };

  getTeam = async (id: string): Promise<TeamModel> => {
    const response = await this.httpClient
      .get<TeamModel>("https://localhost:5001/Team/get-by-id/" + id)
      .toPromise();
    return response;
  };

  getAll = async (): Promise<TeamModel[]> => {
    const response = await this.httpClient
      .get<ResponseModel>("https://localhost:5001/Team/get-all")
      .toPromise();
    return response.result;
  };

  deleteTeam = async (id: string): Promise<TeamModel> => {
    const response = await this.httpClient
      .get<TeamModel>(`https://localhost:5001/Team/delete/${id}`)
      .toPromise();
    return response;
  };

  editTeam = async (id: string, team: TeamModel): Promise<TeamModel> => {
    const response = await this.httpClient
      .post<TeamModel>(`{baseUri}/Team/update/${id}`, team)
      .toPromise();
    return response;
  };

  isValid(control: FormControl) {
    if (control.value < 1) {
      return { inValid: true };
    }
    return null;
  }

  populateForm(team) {
    this.teamForm.setValue(team);
  }
}
