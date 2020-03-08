import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    public dialogRef: MatDialogRef<DialogModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.fromPage = data.pageValue;
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

  submitDialog(){ 
    let form = this.leaveForm.value
    this.formData = {
      empId: this.fromPage,
      leaveType: form.leaveType,
      fromDate: form.fromDate.toLocaleDateString(),
      toDate: form.toDate.toLocaleDateString()
    }
    console.log(this.formData)
    this.dialogRef.close({event:'close',data:this.formData}); 
  }

  closeDialog(){ 
    this.dialogRef.close(); 
  }

}
