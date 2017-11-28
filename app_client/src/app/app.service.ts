import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AppService {

    private apiHost: String = 'http://localhost:3000';

    constructor(
        private http: Http
    ) { }

    public getAllEvents() {
        return this.http.get(this.apiHost + '/api/events')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    
    public filterByCategory(categories) {
        return this.http.post(this.apiHost + '/api/events/filter', categories)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    
    public addEvent(eventData) {
        return this.http.post(this.apiHost + '/api/events/new', eventData)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    public searchByKeywords(tags) {
        return this.http.post(this.apiHost + '/api/events/search', tags)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    
    public loginUser(loginDetails) {
        return this.http.post(this.apiHost + '/api/login', loginDetails)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    public registerUser(userDetails) {
        return this.http.post(this.apiHost + '/api/register', userDetails)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}