import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Subscription, BehaviorSubject } from 'rxjs';
import { EmployeeInformationDto } from 'src/app/model/employeeInformationDto';
import { UserService } from 'src/app/service/user.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Leads } from 'src/app/model/leads';
import { identifierModuleUrl } from '@angular/compiler';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { saveAs } from 'file-saver';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
export let browserRefresh = false;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-mgr-dashboard',
  templateUrl: './mgr-dashboard.component.html',
  styleUrls: ['./mgr-dashboard.component.css']
})
export class MgrDashboardComponent implements OnInit {

  oppoSuits: any = ['2020', '2019', '2018', '2017'];
  month: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  dates: Date[];
  leadName:Leads[]=[];
  currentUser: User;
  currentUserSubscription: Subscription;
  employeeInformationDtos: EmployeeInformationDto[] = [];
  empDetails: EmployeeInformationDto;
  oppoSuitsForm: any;
  workfromehome;
  dialogValue: any;
  sendValue: string;
  makeDisabled: boolean = false;
  filterRequiredError: boolean =false;
  currentRoldId: any;

  constructor(
    
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    //   private jwt:JwtInterceptor
    public dialog: MatDialog
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

      console.log(this.currentUser);
      //this.getLeadNames();
    })
  }

  addLeaves(employeeInformationDto): void {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '600px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      //data: {pageValue: this.sendValue}
      data: { pageValue: employeeInformationDto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        //this.dialogValue = JSON.stringify(result.data);
        this.userService.updateLeave(result.data).subscribe(data => {          
          console.log(data);
          if(data==null)
          {
            this.ngOnInit();
          } 
          });
      }
    });
  }

  deleteLeave(employeeInformationDto){
    const deleteDialog = this.dialog.open(DialogDeleteComponent, {
      width: '600px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      //data: {pageValue: this.sendValue}
      data: { pageValue: employeeInformationDto }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log('The deleteDialog was closed', result.data);
        this.userService.deleteLeave(result.data).subscribe(w => {          
          console.log(w);
          if(w==null)
          {
            this.ngOnInit();
          } 
          });
        //this.dialogValue = JSON.stringify(result.data);
      }
    });
  }
  _setYear(){
    let yearLength = this.oppoSuits.length; //2020,2019,2018,2017 
    let currntYr = new Date().getFullYear();
    for(var i=0;i < yearLength; i++ ){
      if(this.oppoSuits[i] == currntYr){
        return i;        
      }
    }
  }
  _setMonth(){
    let monLength = this.month.length; //2020,2019,2018,2017 
    let currntMon = new Date().getMonth();
    for(var i=0;i < monLength; i++ ){
      if(this.month[i] == currntMon){
        return i;        
      }
    }
  }
  _setLeadName(){
    let currentUser = Number(this.currentUser.username);
    let leads = this.leadName;
    for(var i=0;i<leads.length;i++){
      if(leads[i].empId == currentUser){
        return i;
      }
    }
  }

  buildSearchForm(){
    this.oppoSuitsForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
      selectedleadName: ['', Validators.required]
    })
    //console.log("Selected name is: "+this.oppoSuitsForm.selectedleadName +"selected id: "+this.oppoSuitsForm.selectedleadName.id)
    this.oppoSuitsForm.controls['selectedleadName'].setValue(this.leadName[this._setLeadName()].empName);
    this.oppoSuitsForm.controls['year'].setValue(this.oppoSuits[this._setYear()]);
    this.oppoSuitsForm.controls['month'].setValue(this.month[this._setMonth()]);
    //this.oppoSuitsForm.patchValue({selectedleadName: this.currentUser.username});
    this.currentRoldId = this.currentUser.roles.roleId;
    if(this.currentUser.roles.roleId === 2){
      this.makeDisabled = true;
    } else {
      this.makeDisabled = false;
    }
    this.onSubmit()
  }
  //selection value
  
  editProfileForm = this.fb.group({
    firstname: [''],
    from: new FormControl('', Validators.required),
  })


  clearFilter() {
    this.buildSearchForm();
  }

  showAllData(){
    if(this.currentUser.roles.roleId != 2){
      this.getAllEmployeeWithLeaveInformation(new Date().getMonth() + 1, new Date().getFullYear());
    }
  }

  onSubmit() {
    console.log(this.oppoSuitsForm.value.selectedleadName)
    let selectedLead = this.oppoSuitsForm.value.selectedleadName;
    let selecteMonth = this.oppoSuitsForm.value.month;
    let selectedYear = this.oppoSuitsForm.value.year;
    if(selectedLead && selecteMonth && selectedYear){
      this.getAllEmployeeWithLeaveInformationbylead(selectedLead, selecteMonth, selectedYear);
      this.filterRequiredError=false
    } else{
      this.filterRequiredError = true;
    }
    // alert(JSON.stringify(this.oppoSuitsForm.value))
  }

  ngOnInit() {
    this.getLeadNames();
  }

  updateEmployee() {
    console.log(this.editProfileForm.value.firstname)
    this.userService.updateEmployee(this.empDetails).subscribe(data => {
    });
    //this.modalService.dismissAll();
    console.log("Open Model");
  }

  private getAllEmployeeWithLeaveInformation(month: number, year: number) {
    this.userService.getAllEmployeeWithLeaveInformation(month, year).pipe(first()).subscribe(Emp => {
      this.employeeInformationDtos = Emp;
      console.log(this.employeeInformationDtos);
    })
  }

  private getAllEmployeeWithLeaveInformationbylead(lead: string, month: number, year: number) {
    this.userService.getAllEmployeeWithLeaveInformationByLead(lead, month, year).pipe(first()).subscribe(Emp => {
      this.employeeInformationDtos = Emp;
      console.log(this.employeeInformationDtos);
    })
  }

//for get lead Name
  private getLeadNames() {
    this.userService.getLeadNames().pipe(first()).subscribe(Leadsaray => {

      this.leadName=Leadsaray;
      this.buildSearchForm()
      console.log(Leadsaray);
    });
  }

  downloadTimesheetReport() {
    this.userService.download(this.employeeInformationDtos).subscribe(data => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/vnd.ms.excel' });
      const file = new File([blob], 'IcannExcelReport' + '.xlsx', { type: 'application/vnd.ms.excel' });
      saveAs(file);
    });
  }


  downloadMealCouponReport(){
    this.userService.getMealCupan(this.employeeInformationDtos).subscribe(data => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/vnd.ms.excel' });
      const file = new File([blob], 'IcannExcelReportMealCupan' + '.xlsx', { type: 'application/vnd.ms.excel' });
      saveAs(file);
    });
  }

  downloadShiftAllowReport(){
    this.userService.getShiftallownce(this.employeeInformationDtos).subscribe(data => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/vnd.ms.excel' });
      const file = new File([blob], 'IcannExcelReportShiftAllow' + '.xlsx', { type: 'application/vnd.ms.excel' });
      saveAs(file);
    });
  }

  updateData() {
    this.userService.updateAllEmployee(this.employeeInformationDtos).subscribe(data => {
    });
  }
  downloadFile1() {
    this.userService.download1(this.employeeInformationDtos).subscribe(data => {
      console.log(data);
      //var a= document.createElement("a");
      const blob = new Blob([data], { type: 'application/vnd.ms.excel' });
      const file = new File([blob], 'IcannExcelReport' + '.xlsx', { type: 'application/vnd.ms.excel' });
     //a.href=URL.createObjectURL(file);
   //  a.download="IcannExcelReport";
    // a.click();
       saveAs(file);
    });
  }
}