import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Subscription } from 'rxjs';


import { User } from '../model/user';
import{Leads} from'../model/leads';


@Injectable({ providedIn: 'root' })
export class UserService {

    currentUser: User;
  currentUserSubscription: Subscription;
    
  
    constructor(private http: HttpClient ,
        private authenticationService: AuthenticationService,  )
     {

        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
          
         });
         console.log(this.currentUser)
      }

   

    getLeadNames() {
        
        //  let headers = new HttpHeaders({
        //      'Content-Type': 'application/json',
        //      'Authorization':'Bearer '+ this.currentUser.token });
        //  let options = { headers: headers };
//console.log(options);
        return this.http.get<Leads>(`http://localhost:8082/employee/getleadNames`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }

}