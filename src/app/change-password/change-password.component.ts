import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePwdForm: FormGroup;
  submitted: boolean = false;
  currentUserSubscription: Subscription;
  currentUser: User;

  constructor(private fb:FormBuilder,
    private userService: UserService,
    private authenticationService:AuthenticationService,
    private router: Router,
    ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
        console.log(this.currentUser);
      })
    }

  ngOnInit() {
    // do a rest call to fetch existing password and set it to UI form
    this.buildChangePasswordForm();
  }

  buildChangePasswordForm(){
    this.changePwdForm = this.fb.group({
      // title: ['', Validators.required],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      existingPwd: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('newPassword', 'confirmPassword')
  });

  }

  get f() { return this.changePwdForm.controls; }

//  private String username;
//	private String password;
  onSubmit() {
    this.submitted = true;

    let formData={
      username:this.currentUser.username,
      password:this.changePwdForm.value.existingPwd
    }
    let formDataUpdatedPwd={
      username:this.currentUser.username,
      password:this.changePwdForm.value.newPassword
    }
    this.userService.checkPassword(formData).subscribe((data) => {  

      console.log(data);
      if(data == true){

        this.userService.updatePassword(formDataUpdatedPwd).subscribe((res) => {
          alert("Your password changed successfully please try to login with new password");
          //log out method call
          this.authenticationService.logout();
          this.router.navigate(['/login']);
          console.log("sucess"+res);
        });

      } else{
        //alert 
        alert('Wrong existing password please insert correct password')

        return;
      }
    });


    // stop here if form is invalid
    if (this.changePwdForm.invalid) {
        return;
    }

    // display form values on success
 //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.changePwdForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.changePwdForm.reset();
}

}
