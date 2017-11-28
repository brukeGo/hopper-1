import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-saved',
  templateUrl: './event-saved.component.jade',
  styleUrls: ['./event-saved.component.css']
})
export class EventSavedComponent implements OnInit {
  title   = 'Event Saved';
  message = 'Your event has been saved as a draft. To post, view, or edit this event go to My Events in the user menu.'; 
  constructor() { }

  ngOnInit() {
  }

}
