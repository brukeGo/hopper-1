import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from  '../app.service';
import 'rxjs/Rx';


@Component({
  selector    : 'app-new-event',
  templateUrl : './new-event.component.jade',
  providers   : [AppService]
})
export class NewEventComponent {
  public title;
  public start;
  public end;
  public description;
  public location;
  public tags;

  public event = {} 

  constructor(
    private http    : AppService,
    private router  : Router
  ){}

  createNewEvent(){
    this.event={
      title       : this.title,
      start       : this.start,
      end         : this.end,
      description : this.description,
      location    : this.location,
      tags        : this.tags
    }
    this.http.addEvent(this.event).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/saved']);
      },
    error => { alert(`Server Error`);}
    )
  }

}