
export class EmployeeInformationDto {     
       employee_Id:number;
        firstName:string
      middleName:string;
      lastName:string;
	  gender:string;
	  date_of_join_in_project:string;
	  date_of_release_in_project:string;
	  contact_number:string;
	  email:string;
	  level:string;
	  location:string;
	  lead:string;
	  designationRole:string;
	  billingRate:string;
	  employeeStatus:string;
	  employee_leave_and_wfh_id:number;
	  month:number;
	  year:number;
	  leaveDates:String [];
	  leaveCount;
	  wfhDates:String [];
	  wfhCount:number;
	  workingDayCount:number;
}