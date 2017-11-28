import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.jade'
})
export class SearchEventComponent {
  public title  = 'Search Events';
  public msg    = '';
  public tag    = ''
  public tags   = ['Wajeeh'] ;
  public eventsList;

  constructor(
    private router : Router
  ){}

  searchByTags(){
    this.tags.push(this.tag);
    this.router.navigate(['/searched', { tags: this.tags }]);
  }

}