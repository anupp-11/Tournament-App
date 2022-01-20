import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private fb : FormBuilder) { }

  teamForm = this.fb.group({
    $key: new FormControl(null),
    fullName: new FormControl("",[Validators.required, this.isValid]),
    shortName: new FormControl("",[Validators.required, this.isValid]),
    player1Name: new FormControl("",[Validators.required, this.isValid]),
    player2Name: new FormControl("",[Validators.required, this.isValid]),
    player3Name: new FormControl("",[Validators.required, this.isValid]),
    player4Name: new FormControl("",[Validators.required, this.isValid]),
    player5Name: new FormControl("",[]),
    player6Name: new FormControl("",[]),
    
  })
 
 isValid(control: FormControl){
  if (control.value<1) {
    return { inValid: true };
  }
  return null;
 }
}
