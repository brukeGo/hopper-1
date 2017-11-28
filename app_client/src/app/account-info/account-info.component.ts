import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector    : 'app-account-info',
  templateUrl : './account-info.component.jade'
})
export class AccountInfoComponent { 
  title       = 'Edit Event';
  message     = 'Edit your account information by filling the necessary fields below.';
  buttonText  = 'SAVE CHANGES';
}
