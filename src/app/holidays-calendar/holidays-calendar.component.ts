import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { Role } from '../model/role';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
import { Holidays } from '../model/holidays';

@Component({
  selector: 'app-holidays-calendar',
  templateUrl: './holidays-calendar.component.html',
  styleUrls: ['./holidays-calendar.component.css']
})
export class HolidaysCalendarComponent implements OnInit {
  currentUser: User;
  holidays: Holidays[] = [];
  holiday:Holidays;
 
  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    this.getHolidays();
    this.holiday=new Holidays;
  }

  get isManager() {
    return this.currentUser && (this.currentUser.roles.roleNames === Role.Manager || this.currentUser.roles.roleNames === Role.Lead);
    this.holidays;
  }


  private getHolidays() {
    this.userService.getHolidays().pipe(first()).subscribe(holi => {

      this.holidays = holi;
      console.log(this.holidays);
    })
  }
  public submit() {
   console.log(+this.holiday.holidayName, this.holiday.holiday_date);


  }

}
