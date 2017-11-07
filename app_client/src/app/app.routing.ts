import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, RouterOutlet, ActivatedRoute} from '@angular/router';

    
import { AppComponent }                 from './app.component';
import { WellcomeComponent }            from './wellcome/wellcome.component';
import { AccountComponent }             from './account/account.component';
import { AccountInfoComponent }         from './account-info/account-info.component';
import { LoginComponent }               from './login/login.component';
import { RecoverComponent }             from './recover/recover.component';
import { RegisterComponent }            from './register/register.component';
import { FinderComponent }              from './finder/finder.component';
import { LikedComponent }               from './liked/liked.component';
import { EventComponent }               from './event/event.component';
import { SearchEventComponent }         from './search-event/search-event.component';
import { NewEventComponent }            from './new-event/new-event.component';
import { EventsListComponent }          from './events-list/events-list.component';
import { EventCategoriesComponent }     from './event-categories/event-categories.component';
import { EventSavedComponent }          from './event-saved/event-saved.component';
import { EventSearchedComponent }       from './event-searched/event-searched.component';


export const router: Routes = [
    { path: '',             redirectTo  : '/login', pathMatch: 'full' },
    { path: '',             component   : AppComponent },
    { path: 'login',        component   : LoginComponent },
    { path: 'wellcome',     component   : WellcomeComponent },
    { path: 'recover',      component   : RecoverComponent },
    { path: 'register',     component   : RegisterComponent},
    { path: 'liked',        component   : LikedComponent},
    { path: 'finder',       component   : FinderComponent},
    { path: 'categories',   component   : EventCategoriesComponent},
    { path: 'event',        component   : EventComponent},
    { path: 'saved',        component   : EventSavedComponent},
    { path: 'search',       component   : SearchEventComponent},
    { path: 'searched',     component   : EventSearchedComponent},
    { path: 'events',       component   : EventsListComponent},
    { path: 'new-event',    component   : NewEventComponent},
    { path: 'edit',         component   : AccountInfoComponent},
    { path: 'account',      component   : AccountComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);