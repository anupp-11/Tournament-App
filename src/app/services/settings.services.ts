import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResponseModel, SettingModel } from '../models/team.model';

export interface ISettingsService {
  addSetting(setting: SettingModel): Promise<SettingModel>;
  get(): Promise<SettingModel>;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements ISettingsService{

  constructor(private fb: FormBuilder,private httpClient: HttpClient) { }

  settingForm = this.fb.group({
    id: [null,[]],
    primaryColor: ["",[]],
    secondaryColor: ["",[]],
    aliveColor: ["",[]],
    deadColor: ["",[]],
    aliveCounterBgImage: ["",[]],
    dominationBgImage: ["",[]],
    eliminatedBgImage: ["",[]],
  });


  addSetting = async (setting: SettingModel): Promise<SettingModel> => {
    const response = await this.httpClient
      .post<SettingModel>(
        'https://tournament-pubg.herokuapp.com/SystemSetting/save',
        setting
      )
      .toPromise();
    return response;
  };

 
  get = async (): Promise<SettingModel> => {
    const response = await this.httpClient
      .get<ResponseModel>('https://tournament-pubg.herokuapp.com/SystemSetting/get')
      .toPromise();
    return response.result;
  };

  populateForm(settings) {
    this.settingForm.setValue(settings);
  }

  
}
