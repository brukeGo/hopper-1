// angular modules
import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';


// App module
import { AppComponent }             from './app.component';
import {routes}                     from  './app.routing';
import { WellcomeComponent }        from './wellcome/wellcome.component';
import { AccountComponent }         from './account/account.component';
import { LoginComponent }           from './login/login.component';
import { AccountInfoComponent }     from './account-info/account-info.component';
import { RecoverComponent }         from './recover/recover.component';
import { RegisterComponent }        from './register/register.component';
import { SignupComponent }          from './signup/signup.component';
import { FinderComponent }          from './finder/finder.component';
import { LikedComponent }           from './liked/liked.component';
import { NewEventComponent }        from './new-event/new-event.component';
import { EventComponent }           from './event/event.component';
import { EventCategoriesComponent } from './event-categories/event-categories.component';
import { EventsListComponent }      from './events-list/events-list.component';
import { SearchEventComponent }      from './search-event/search-event.component';
import { FilteredEventsComponent }  from './filtered-events/filtered-events.component';
import { EventSavedComponent } from './event-saved/event-saved.component';
import { EventSearchedComponent } from './event-searched/event-searched.component';


@NgModule({
  declarations: [
    AppComponent,
    WellcomeComponent,
    AccountComponent,
    LoginComponent,
    AccountInfoComponent,
    RecoverComponent,
    RegisterComponent,
    SignupComponent,
    FinderComponent,
    LikedComponent,
    NewEventComponent,
    EventComponent,
    EventCategoriesComponent,
    EventsListComponent,
    SearchEventComponent,
    FilteredEventsComponent,
    EventSavedComponent,
    EventSearchedComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
