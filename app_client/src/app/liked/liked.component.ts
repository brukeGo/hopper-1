import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';


@Component({
  selector    : 'app-liked',
  templateUrl : './liked.component.jade',
  styleUrls   : ['./liked.component.css']
})
export class LikedComponent implements OnInit{
  title = 'Liked Events';
  msg   = '';
  public data;

  constructor(
    private route : ActivatedRoute
  ){}

  ngOnInit() {

    
    this.data = this.route.snapshot.queryParams;
    console.log(this.data);
    
  }
  
  
}

