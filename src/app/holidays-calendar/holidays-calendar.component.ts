import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { Role } from '../model/role';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
import { Holidays } from '../model/holidays';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material';

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
  holidayList: any;
  
  @ViewChild('inputDate', { read: MatInput, static: false}) inputDate: MatInput;
  @ViewChild('inputHoliday', { read: MatInput, static: false}) inputHoliday: MatInput;
 
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

  ngAfterViewInit() {  }

  buildHolidayForm(){
    this.holidayForm = this.fb.group({
      holidayName: ['', Validators.required],
      holidayDate: ['', Validators.required]
    })
  }

  dateFormatter(cdate:any){
    function pad(n) {return n < 10 ? "0"+n : n;}
    let result = pad(cdate.getMonth()+1)+"/"+pad(cdate.getDate())+"/"+cdate.getFullYear();
    console.log("selected date is: "+result)
    return result;
  }

  dateFormatter2(cdate:any){
    function pad(n) {return n < 10 ? "0"+n : n;}
    let result = cdate.getFullYear()+"-"+pad(cdate.getMonth()+1)+"-"+pad(cdate.getDate());
    console.log("selected date is: "+result)
    return result;
  }

  onSubmitHoliday(){
    //Reset for needs to Refactor
    if(this.inputDate.value && this.inputHoliday.value){
      let isHolidayExist = false;
      let holidayList = this.holidayList;
      let dateToBeAdd = this.dateFormatter2(this.inputDate.value);
      
      holidayList.forEach(function (arrayItem) {
        var x = arrayItem.holiday_date
        if(x === dateToBeAdd){
          alert(dateToBeAdd +" date is already added in holiday. Kindly check.")
          isHolidayExist = true;
          return false;
        }
        console.log(x);
      });
      
      if(!isHolidayExist){
        let holidayFormData = {
          holidayName : this.holidayForm.value.holidayName,
          holiday_date : this.dateFormatter(this.holidayForm.value.holidayDate)
        }
        //alert("Holiday details going to submit: "+JSON.stringify(holidayFormData));
        this.userService.addHoliday(holidayFormData).subscribe(data => {
          this.inputDate.value = '';
          this.holidayForm.value.holidayName = null;
          this.inputHoliday.value = '';
          this.holidayForm.value.holidayDate = {};
          alert("Holidays Added Successfully");
          this.getHolidays();
        });
      }
    } else{
      alert("Please select 'Holiday Name and Date'");
    }
    
    
  }


  get isManager() {
    return this.currentUser && (this.currentUser.roles.roleNames === Role.Manager || this.currentUser.roles.roleNames === Role.Lead);
    this.holidays;
  }


  private getHolidays() {
    this.userService.getHolidays().pipe(first()).subscribe(holi => {
      this.holidays = holi;
      this.holidayList = holi;
      console.log(this.holidays);
    })
  }

  public submit() {
   console.log(+this.holiday.holidayName, this.holiday.holiday_date);


  }

}
