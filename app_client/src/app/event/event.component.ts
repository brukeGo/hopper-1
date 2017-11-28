import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.jade'
})
export class EventComponent {
  event = {
    title       : 'Party',
    startDate   : '2017-12-09 02:00:00.000Z' , 
    startTime   : '02:00:00',
    location    : 'Here is the location',
    description : 'Here is Description'  
  } 
  
}