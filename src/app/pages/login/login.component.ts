import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string;
  password: string;
  errorMsg: string = null;
  constructor(private router: Router,) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  onLoginPress(){
    if(this.email === "moonlightofficial@admin.com" && this.password === "moonlight@77"){
      this.router.navigate(['/dashboard']);
      //save user to local storage
      localStorage.setItem('user', JSON.stringify({
        isAuthenticated: true
      }));

    }else{
      this.errorMsg = "Please enter valid credentials";
    }

  }

}
