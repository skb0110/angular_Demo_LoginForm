import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

interface LeaveOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent implements OnInit {
  fromPage:string;
  fromDialog:string;
  formData: any;
  empId: number;
  fullName: string;
  leaveId: number;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.fromPage = data.pageValue;
    this.empId= data.pageValue.employee_Id;
    this.fullName = data.pageValue.firstName +" "+data.pageValue.lastName;
    this.leaveId=data.pageValue.employee_leave_and_wfh_id;
  }

  ngOnInit() {
  }

  leaveForm = new FormGroup({
    leaveType: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
  });

  leaves: LeaveOption[] = [
    {value: 'leave', viewValue: 'Leave'},
    {value: 'wfh', viewValue: 'WorkFromHome'}
  ];

  //var dateobj = new Date();

  dateFormatter(cdate:any){
    function pad(n) {return n < 10 ? "0"+n : n;}
    let result = pad(cdate.getMonth()+1)+"/"+pad(cdate.getDate())+"/"+cdate.getFullYear();
    console.log("selected date is: "+result)
    return result;
  }
  submitDialog(){ 
    let form = this.leaveForm.value
    this.formData = {
      leaveId:this.leaveId,
      empId: this.empId,
      leaveType: form.leaveType,
      // fromDate: form.fromDate.toLocaleDateString(),
      // toDate: form.toDate.toLocaleDateString()
      fromDate: this.dateFormatter(form.fromDate),
      toDate: this.dateFormatter(form.toDate)
    }
    console.log(this.formData)
    this.dialogRef.close({event:'close',data:this.formData}); 
  }

  closeDialog(){ 
    this.dialogRef.close(); 
  }

}
