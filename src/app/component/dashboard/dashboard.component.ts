
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../../model/user';

import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { Leads } from '../../model/leads';
import { EmployeeInformationDto } from 'src/app/model/employeeInformationDto';
import { Employee_details_leave_and_wfhDto } from 'src/app/model/employee_details_leave_and_wfhDto';
//import{JwtInterceptor} from '../../helpers/jwt.interceptor';

@Component({

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  leadName: Leads;
  employeeInformationDto: EmployeeInformationDto;


  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    //   private jwt:JwtInterceptor
  ){
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    console.log(this.currentUser)
  }

  ngOnInit() {
    this.loadAllUsers();
    this.getEmployeeWithLeaveInformation();

    console.log(this.leadName);

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }
  private loadAllUsers() {
    this.userService.getLeadNames().pipe(first()).subscribe(Leads => {
      this.leadName = Leads;
      console.log(this.leadName);
    });
  }

  private getEmployeeWithLeaveInformation() {
    this.userService.getEmployeeWithLeaveInformation(Number(this.currentUser.username),new Date().getMonth() + 1,new Date().getFullYear()).pipe(first()).subscribe(Emp => {
      this.employeeInformationDto = Emp;

      console.log(this.employeeInformationDto);
    })
  }

  onSubmit() {

  }
}


