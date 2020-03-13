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
  leaveToRemove:any = [];
  wfhToRemove:any = [];

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

    for (var i = this.wfhToRemove.length -1; i >= 0; i--)
    this.employeeInformationDtos.wfhDates.splice(this.wfhToRemove[i],1);

    for (var k = this.leaveToRemove.length -1; k >= 0; k--)
    this.employeeInformationDtos.leaveDates.splice(this.leaveToRemove[k],1);

    console.log("--------"+this.employeeInformationDtos.wfhDates)
    this.employeeInformationDtos.wfhCount = this.employeeInformationDtos.wfhCount - this.wfhToRemove.length;
    this.employeeInformationDtos.leaveCount = this.employeeInformationDtos.leaveCount - this.leaveToRemove.length;

    this.deleteDialog.close({event:'close',data:this.employeeInformationDtos}); 
    alert("Leave Removed successfully for Employee id: "+this.empId);
  }

  removeThisDate(date: any, evt:any){
    let leaveType = evt.target.title;
    if(leaveType === "wfh"){
      this.wfhToRemove.push(date[0]);
    } else{
      this.leaveToRemove.push(date[0]);
    }  
    console.log("Removed date is: "+ date);
    evt.target.parentElement.classList.add('active');
    console.log("leaveToRemoved : "+this.leaveToRemove +" wfhToRemove :"+this.wfhToRemove);
  }

  closeDialog(){ 
    this.leaveToRemove = [];
    this.wfhToRemove = [];
    this.deleteDialog.close(); 
  }

  ngOnInit() {
  }

  leaveForm = new FormGroup({

  });

}
