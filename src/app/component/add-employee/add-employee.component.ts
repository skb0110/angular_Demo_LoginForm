import { Component, OnInit } from '@angular/core';
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { EmployeeInformationDto } from 'src/app/model/employeeInformationDto';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addNewEmpForm: FormGroup;
  submitted:boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this._buildAddEmpForm();
  }

  _buildAddEmpForm(){
    this.addNewEmpForm = this.fb.group({
      empId: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: ['', Validators.required],
      level: ['', Validators.required],
      designationRole: ['', Validators.required],
      projectJoinDate: ['', Validators.required],
      projectReleaseDate: ['', Validators.required],
    })
  }

  get f() { return this.addNewEmpForm.controls; }

  onSubmit(){
    console.log(this.addNewEmpForm.value);
    this.submitted = true;
    const formData = this.addNewEmpForm.value;
    if (this.addNewEmpForm.invalid) {
      return;
    }
    this.userService.addemployee(formData).subscribe(data=>{
      console.log("Employee Add call done."+data);
    })

  }

}
