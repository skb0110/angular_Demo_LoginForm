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

//import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

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
  leadName: Leads;
  dates: Date[];
  currentUser: User;
  currentUserSubscription: Subscription;
  employeeInformationDtos: EmployeeInformationDto[] = [];
  empDetails: EmployeeInformationDto;
	workfromehome;
	
	dialogValue:any; 
  sendValue:string;

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
    })
	}
	
	openDialog(employeeInformationDto): void {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '600px',
      backdropClass:'custom-dialog-backdrop-class',
      panelClass:'custom-dialog-panel-class',
			//data: {pageValue: this.sendValue}
			data: {pageValue: employeeInformationDto.employee_Id}
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('The dialog was closed',result);
        this.dialogValue = JSON.stringify(result.data);
      }
    });
  }

  //selection value
  oppoSuitsForm = this.fb.group({
    year: [''],
    month: [''],
    selectedleadName: []
  })

  editProfileForm = this.fb.group({
    firstname: [''],
    from: new FormControl('', Validators.required),
  })

  _addLeaves() {
    alert("Add Leaves for: ");
  }

  _deleteLeaves() {
    alert("Delete Leaves for: ");
  }

  checkoutForm = this.fb.group({
    date: ['', Validators.required],
  });

  ClearFilter() {
    console.log("mg")
    this.getAllEmployeeWithLeaveInformation(new Date().getMonth() + 1, new Date().getFullYear());
  }

  onSubmit() {
    console.log(this.oppoSuitsForm.value.selectedleadName)
    this.getAllEmployeeWithLeaveInformationbylead(this.oppoSuitsForm.value.selectedleadName, this.oppoSuitsForm.value.month, this.oppoSuitsForm.value.year);
    //  this.getAllEmployeeWithLeaveInformation(this.oppoSuitsForm.value.month,this.oppoSuitsForm.value.year);
    // alert(JSON.stringify(this.oppoSuitsForm.value))
  }

  public addWorkfromehomes(index, event) {
    console.log(index, this.workfromehome);
    //this.employeeInformationDtos[index].wfhDates.push();
    // this.availableTargets.splice(index, 1);
    console.log("workfrome home" + index, +event.value)
  }

  ngOnInit() {
    this.getLeadNames();
    this.getAllEmployeeWithLeaveInformation(new Date().getMonth() + 1, new Date().getFullYear());
  }

  openModal(targetModal, employeeInformationDto) {
    console.log("open model: " + employeeInformationDto.employee_Id)
    this.empDetails = employeeInformationDto;
		console.log(this.empDetails)
    // this.modalService.open(targetModal, {
    //   centered: true,
    //   backdrop: 'static'
    // });
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

  private getLeadNames() {
    this.userService.getLeadNames().pipe(first()).subscribe(Leads => {
      this.leadName = Leads;
      console.log(this.leadName);
    });
  }

  downloadFile() {
    // check something
    this.userService.download(this.employeeInformationDtos).subscribe(data => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/vnd.ms.excel' });
      const file = new File([blob], 'IcannExcelReport' + '.xlsx', { type: 'application/vnd.ms.excel' });
      //saveAs(file);
    });
  }

  updateData() {
    this.userService.updateAllEmployee(this.employeeInformationDtos).subscribe(data => {
    });
  }
  downloadFile1() {
    // check something
    this.userService.download1(this.employeeInformationDtos).subscribe(data => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/vnd.ms.excel' });
      const file = new File([blob], 'IcannExcelReport' + '.xlsx', { type: 'application/vnd.ms.excel' });
      //saveAs(file);
    });
  }
}