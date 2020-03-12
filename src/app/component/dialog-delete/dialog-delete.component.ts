import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeInformationDto } from 'src/app/model/employeeInformationDto';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  fromPage:string;
  fromDialog:string;
  formData: any;
  empId: number;
  leaveId: number;
  employeeInformationDtos:EmployeeInformationDto;

  constructor(
    public deleteDialog: MatDialogRef<DialogDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.fromPage = data.pageValue;
    console.log(data.pageValue);
    this.empId= data.pageValue.employee_Id;
    this.employeeInformationDtos=data.pageValue;
    //this.leaveId=data.pageValue.employee_leave_and_wfh_id;
  }

  submitDialog(){ 
    let form = this.leaveForm.value
    // this.formData = {
    //   leaveId:this.leaveId,
    //   empId: this.empId,
    //   leaveType: form.leaveType,
    //   fromDate: form.fromDate.toLocaleDateString(),
    //   toDate: form.toDate.toLocaleDateString()
    // }
    // console.log(this.formData)
    //this.dialogRef.close({event:'close',data:this.formData}); 

   

  }

  closeDialog(){ 
    this.deleteDialog.close(); 
  }

  ngOnInit() {
  }

  leaveForm = new FormGroup({

  });

}
