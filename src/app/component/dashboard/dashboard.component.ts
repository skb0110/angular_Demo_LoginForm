
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription,Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../../model/user';

import { AuthenticationService } from '../../service/authentication.service';
import{UserService} from '../../service/user.service';
import { Leads } from '../../model/leads';
//import{JwtInterceptor} from '../../helpers/jwt.interceptor';

@Component({

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  lead:Leads[]=[];

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
    //   private jwt:JwtInterceptor



  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
         this.currentUser = user;
       
      });
      console.log(this.currentUser)
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();
  }
     private loadAllUsers() {
        this.userService.getLeadNames().pipe(first()).subscribe(leads => {
            
        console.log(Leads);
        });
    }
}
  

