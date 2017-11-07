import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import  { AppService } from '../app.service';

@Component({
  selector    : 'app-login',
  templateUrl : './login.component.jade',
  providers   : [AppService]
})
export class LoginComponent  {
  title = 'Event Hopper';

  public email ;
  public password;
  public response;
  public rememberMe;
  public msg;

  public loginData = {
    email      : this.email,
    password   : this.password,
    rememberMe : this.rememberMe
  }


  constructor(
    private router : Router,
    private http   : AppService
  ){}


  /* loginUser(){
    this.http.loginUser(this.loginData).subscribe(
      response => {
        console.log(response);
      },
      error => {
        this.msg = 'Wrong Details';
        console.log(error);
      }
    )
  } */

  loginUser(){
    this.router.navigate(['/wellcome']);
  }

}
