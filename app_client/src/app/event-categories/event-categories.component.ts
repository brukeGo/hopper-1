import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';    


import { AppService } from  '../app.service';
import 'rxjs/Rx';


@Component({
  selector    : 'app-event-categories',
  templateUrl : './event-categories.component.jade',
  providers   : [AppService] 
})
export class EventCategoriesComponent{
 

  title     = 'Filter Events';
  category  = {
      offCampus     :'',
      education     :'',
      alumni        :'',
      free          :'',
      campusOrg     :'',
      unaffiliated  :'',
      onCampus      :'',
      staff         :'',
      students      :'',
      sports        :''
  }
  public categories;
  constructor(
    private http   : AppService,
    private router : Router
  ){}

  filterByCategories(){
    this.http.filterByCategory(this.category).subscribe(
      response => {
        this.router.navigate(['/liked']);
      },
      error => { alert(`Server Error`);}
    )
  }

}