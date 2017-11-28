import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppService } from  '../app.service';
import 'rxjs/Rx';

@Component({
  selector    : 'app-events-list',
  templateUrl : './events-list.component.jade',
  providers   : [AppService]
})

export class EventsListComponent implements OnInit{
  title       = 'All Events';
  eventsList  = [];
  
  constructor(
    private http : AppService
  ){}

  public getEvents(){
    this.http.getAllEvents().subscribe(
        response => {
          this.eventsList = response;
        },
      error => { alert(`Server Error`);}
    );
  } 

  ngOnInit() {
    this.getEvents();
  }
}
