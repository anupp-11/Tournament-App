import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  teamInfo = new FormGroup({
    fullName: new FormControl(''),
    shortName: new FormControl(''),
    
  });

  constructor() { }
  

  ngOnInit() {
  }

}
