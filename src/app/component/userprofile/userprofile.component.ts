import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { EmployeeInformationDto } from 'src/app/model/employeeInformationDto';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userForm: FormGroup
  currentUser: User;
  currentUserSubscription: Subscription;
  emp: EmployeeInformationDto;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

    });
  }

  ngOnInit() {
    this.getemployeeInformation();
    console.log(this.emp);


//    this.userForm = this.formBuilder.group(this.emp);



  }

  onSubmit() {
    console.log(this.userForm)
    console.log(this.emp)
  }


  private getemployeeInformation() {
    this.userService.getemployeeInformation(Number(this.currentUser.username)).pipe(first()).subscribe(Emp => {
      this.emp = Emp
      console.log(this.emp);

    })
  }

}

