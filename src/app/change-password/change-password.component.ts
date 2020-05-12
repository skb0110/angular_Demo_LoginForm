import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePwdForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb:FormBuilder) { }

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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePwdForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.changePwdForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.changePwdForm.reset();
}

}
