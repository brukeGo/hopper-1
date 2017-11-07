import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';


import { AppService } from '../app.service'

@Component({
  selector    : 'app-register',
  templateUrl : './register.component.jade',
  providers   : [AppService]
})
export class RegisterComponent {
  buttonText  = 'SIGN UP'
  title       = 'Create Account';
  message     = 'Please enter your information in the fields below. You will recieve a verification email to confirm your account.';

  public  firstName;
  public  lastName;
  public  email;
  public  password;

  public userDetails = {
    firstName : this.firstName,
    lastName  : this.lastName,
    email     : this.email,
    password  : this.password
  }
  
  constructor(
    private http    : AppService,
    private router  : Router
  ){}

  registerUser(){
    this.http.registerUser(this.userDetails).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      } 
    )
  }
}