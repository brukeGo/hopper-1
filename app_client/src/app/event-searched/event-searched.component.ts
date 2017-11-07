import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import  {AppService} from '../app.service';


@Component({
  selector    : 'app-event-searched',
  templateUrl : './event-searched.component.jade',
  providers   : [AppService]
})
export class EventSearchedComponent implements OnInit {

  public queryParmas ;
  public tags;
  public msg = '';

  constructor(
    private http  : AppService,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.queryParmas  = this.route.snapshot.params;
    this.tags         = this.queryParmas.tags.split(',');
    this.http.searchByKeywords(this.tags).subscribe(
      response =>{
      },
      error =>{
        this.msg = 'Server is not responding !'; 
        alert('Server Error');
      }
    )
  }

}
