import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { TeamModel } from "../models/team.model";

export interface ITeamsService {
  addTeam(team: TeamModel): Promise<TeamModel>;
  editTeam(id: number, team: TeamModel): Promise<TeamModel>;
  getTeam(id: number): Promise<TeamModel>;
  getAll(): Promise<TeamModel[]>;
  deleteTeam(id: number): Promise<TeamModel>;
}

@Injectable({
  providedIn: "root",
})
export class TeamsService implements ITeamsService {
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  teamForm = this.fb.group({
    id: new FormControl("", [Validators.required, this.isValid]),
    fullName: new FormControl("", [Validators.required, this.isValid]),
    shortName: new FormControl("", [Validators.required, this.isValid]),
    player1Name: new FormControl("", [Validators.required, this.isValid]),
    player2Name: new FormControl("", [Validators.required, this.isValid]),
    player3Name: new FormControl("", [Validators.required, this.isValid]),
    player4Name: new FormControl("", [Validators.required, this.isValid]),
    player5Name: new FormControl("", []),
    player6Name: new FormControl("", []),
  });

  baseUri = "https://localhost:5001";

  addTeam = async (team: TeamModel): Promise<TeamModel> => {
    const response = await this.httpClient
      .post<TeamModel>("https://localhost:5001/Team/add", team)
      .toPromise();
    return response;
  };

  getTeam = async (id: number): Promise<TeamModel> => {
    const response = await this.httpClient
      .get<TeamModel>("https://localhost:5001/Team/get-by-id/" + id)
      .toPromise();
    return response;
  };

  getAll = async (): Promise<TeamModel[]> => {
    const response = await this.httpClient
      .get<TeamModel[]>("https://localhost:5001/Team/get-all")
      .toPromise();
    return response;
  };

  deleteTeam = async (id: number): Promise<TeamModel> => {
    const response = await this.httpClient
      .delete<TeamModel>(`{baseUri}/Team/delete/{id}`)
      .toPromise();
    return response;
  };

  editTeam = async (id: number, team: TeamModel): Promise<TeamModel> => {
    const response = await this.httpClient
      .put<TeamModel>(`{baseUri}/Team/update/{id}`, team)
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
