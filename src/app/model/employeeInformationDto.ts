import { Employee_details_leave_and_wfhDto } from './employee_details_leave_and_wfhDto';

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
	  employee_details_leave_and_wfhDto:Employee_details_leave_and_wfhDto;
}