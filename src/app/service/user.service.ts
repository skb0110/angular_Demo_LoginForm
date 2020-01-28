import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Subscription } from 'rxjs';


import { User } from '../model/user';
import{Leads} from'../model/leads';
import { EmployeeInformationDto } from '../model/employeeInformationDto';
import { Employee_details_leave_and_wfhDto } from '../model/employee_details_leave_and_wfhDto';


@Injectable({ providedIn: 'root' })
export class UserService {

    currentUser: User;
  currentUserSubscription: Subscription;
    
  
    constructor(private http: HttpClient ,
        private authenticationService: AuthenticationService,  )
     {

        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
          
         });
         console.log(this.currentUser)
      }

   

    getLeadNames() {
        
        return this.http.get<Leads>(`http://localhost:8082/employee/getleadNames`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }

    getEmployeeWithLeaveInformation(eId:number,month:number,year:number)
    {
        return this.http.get<EmployeeInformationDto>(`http://localhost:8082/employee/getEmployeeWithLeaveInformation/${eId}/${month}/${year}`);
    }

    getAllEmployeeWithLeaveInformation(month:number,year:number)
    {
        return this.http.get<EmployeeInformationDto []>(`http://localhost:8082/employee/getAllEmployeeWithLeaveInformation/${month}/${year}`);
    }

    getAllEmployeeWithLeaveInformationByLead(lead:string,month:number,year:number)
    {
        return this.http.get<EmployeeInformationDto []>(`http://localhost:8082/employee/getEmployeelist/${lead}/${month}/${year}`);
    }

    download(employeeInformationDto:EmployeeInformationDto []) {
     
        return this.http.post('http://localhost:8082/download', employeeInformationDto, {responseType: 'blob' });
    }

}