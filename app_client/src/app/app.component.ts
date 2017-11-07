import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.jade'
})
export class AppComponent {
  title = 'Event Hopper';
  link = '/welcome';
}
