import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Subscription, BehaviorSubject } from 'rxjs';
import { EmployeeInformationDto } from 'src/app/model/employeeInformationDto';
import { UserService } from 'src/app/service/user.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Leads } from 'src/app/model/leads';
import { identifierModuleUrl } from '@angular/compiler';
import { saveAs } from 'file-saver';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-mgr-dashboard',
  templateUrl: './mgr-dashboard.component.html',
  styleUrls: ['./mgr-dashboard.component.css']
})
export class MgrDashboardComponent implements OnInit {
  oppoSuits: any = ['2020', '2019', '2018', '2017'];
  month:any =['1','2','3','4','5','6','7','8','9','10','11','12']
  leadName:Leads;
dates:Date[];
  currentUser: User;
  currentUserSubscription: Subscription;
  employeeInformationDtos:EmployeeInformationDto []=[];
  workfromehome;
  constructor(
    public fb: FormBuilder,

    private authenticationService: AuthenticationService,
      private userService: UserService,
    //   private jwt:JwtInterceptor
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

      console.log(this.currentUser);
  })
}

//selection value
oppoSuitsForm = this.fb.group({
  year: [''],
month:[''],
selectedleadName:['']


})


checkoutForm = this.fb.group({
  date: ['', Validators.required],

});

onSubmit() {

  this.getAllEmployeeWithLeaveInformation(this.oppoSuitsForm.value.month,this.oppoSuitsForm.value.year);
 // alert(JSON.stringify(this.oppoSuitsForm.value))


}


public addWorkfromehomes(index,e) {
  
//    console.log(index,this.workfromehome,e.target.value);
    // this.employeeInformationDtos[index].employee_details_leave_and_wfhDto.wfhDates.push();
      //this.availableTargets.splice(index, 1);
}



  ngOnInit() {
  this.getLeadNames();
    this.getAllEmployeeWithLeaveInformation(1,2020);
  }


  private getAllEmployeeWithLeaveInformation(month:number,year:number )
  {
    this.userService.getAllEmployeeWithLeaveInformation(month,year).pipe(first()).subscribe(Emp=>{
      this.employeeInformationDtos=Emp;

      console.log(this.employeeInformationDtos);
    })
  }

  private getLeadNames() {
    this.userService.getLeadNames().pipe(first()).subscribe(Leads => {
        this.leadName=Leads;
    console.log(this.leadName);
    });
}


downloadFile() {
  // check something
  // ...
  this.userService.download(this.employeeInformationDtos).subscribe(data => {
    console.log(data);
    const blob = new Blob([data], { type : 'application/vnd.ms.excel' });
             const file = new File([blob], 'IcannExcelReport' + '.xlsx', { type: 'application/vnd.ms.excel' });
             saveAs(file);


});
 
}

}



