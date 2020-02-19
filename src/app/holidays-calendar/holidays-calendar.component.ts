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
  holid: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    this.getHolidays();
  }

  get isManager() {
    return this.currentUser && (this.currentUser.roles.roleNames === Role.Manager || this.currentUser.roles.roleNames === Role.Lead);
  }


  private getHolidays() {
    this.userService.getHolidays().pipe(first()).subscribe(holi => {

      this.holidays = holi;
      console.log(this.holidays);
    })
  }
public  submit(){
console.log(+this.holid.holidayName,this.holid.holiday_date);

 
}

}
