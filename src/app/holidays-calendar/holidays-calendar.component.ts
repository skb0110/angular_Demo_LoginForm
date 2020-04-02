import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { Role } from '../model/role';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
import { Holidays } from '../model/holidays';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-holidays-calendar',
  templateUrl: './holidays-calendar.component.html',
  styleUrls: ['./holidays-calendar.component.css']
})
export class HolidaysCalendarComponent implements OnInit {
  currentUser: User;
  holidays: Holidays[] = [];
  holiday:Holidays;
  holidayForm: FormGroup;
  
 
  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    this.getHolidays();
    this.holiday=new Holidays;
    this.buildHolidayForm();
  }

  buildHolidayForm(){
    this.holidayForm = this.fb.group({
      holidayName: ['', Validators.required],
      holidayDate: ['', Validators.required]
    })
  }

  dateFormatter(cdate:any){
    function pad(n) {return n < 10 ? "0"+n : n;}
    let result = pad(cdate.getMonth()+1)+"-"+pad(cdate.getDate())+"-"+cdate.getFullYear();
    console.log("selected date is: "+result)
    return result;
  }

  onSubmitHoliday(){
    let holidayFormData = {
      holidayName : this.holidayForm.value.holidayName,
      holiday_date : this.dateFormatter(this.holidayForm.value.holidayDate)
    }
    //alert("Holiday details going to submit: "+JSON.stringify(holidayFormData));
    this.userService.addHoliday(holidayFormData).subscribe(data => {
      this.holidayForm.reset();
      console.log("Holidays Added and result is : "+ data);
      this.getHolidays();
    });
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
