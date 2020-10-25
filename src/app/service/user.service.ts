import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, catchError, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Subscription } from 'rxjs';


import { User } from '../model/user';
import{Leads} from'../model/leads';
import { EmployeeInformationDto } from '../model/employeeInformationDto';
import { Employee_details_leave_and_wfhDto } from '../model/employee_details_leave_and_wfhDto';
import { Holidays } from '../model/holidays';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {

    currentUser: User;
    currentUserSubscription: Subscription;
    public baseApiUrl = environment.base_api_url;

    constructor(private http: HttpClient ,
        private authenticationService: AuthenticationService,  )
     {

        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;

         });
         console.log(this.currentUser)
      }



    getLeadNames() {

        return this.http.get<Leads[]>(this.baseApiUrl+`/employee/getleadNames`);
        console.log("names")
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }
//dashboard
    getEmployeeWithLeaveInformation(eId:number,month:number,year:number)
    {
        return this.http.get<EmployeeInformationDto>(this.baseApiUrl+`/employee/getEmployeeWithLeaveInformation/${eId}/${month}/${year}`);
    }

    getemployeeInformation(eId:number){
        return this.http.get<EmployeeInformationDto>(this.baseApiUrl+`/employee/getEmployee/${eId}`);
    }

    getAllEmployeeWithLeaveInformation(month:number,year:number)
    {
        return this.http.get<EmployeeInformationDto []>(this.baseApiUrl+`/employee/getAllEmployeeWithLeaveInformation/${month}/${year}`);
    }

    getAllEmployeeWithLeaveInformationByLead(lead:string,month:number,year:number)
    {
        return this.http.get<EmployeeInformationDto []>(this.baseApiUrl+`/employee/getEmployeelist/${lead}/${month}/${year}`);
    }

    download(employeeInformationDto:EmployeeInformationDto []) {

        return this.http.post(this.baseApiUrl+'/download', employeeInformationDto, {responseType: 'blob' });
    }
    download1(employeeInformationDto:EmployeeInformationDto []) {

        return this.http.post(this.baseApiUrl+'/download1', employeeInformationDto, {responseType: 'blob' });
    }

    updateAllEmployee(employeeInformationDto:EmployeeInformationDto []) {

        return this.http.post(this.baseApiUrl+'/employee/updateAllEmployee', employeeInformationDto);
    }

    updateEmployee(employeeInformationDto:EmployeeInformationDto) {

        return this.http.post(this.baseApiUrl+'/employee/updateEmployee', employeeInformationDto);
    }

    deleteLeave(employeeInformationDto:EmployeeInformationDto) {

        return this.http.post(this.baseApiUrl+'/delete', employeeInformationDto);
    }
    addemployee(employeeInformationDto:EmployeeInformationDto)
    {
        return this.http.post(this.baseApiUrl+'/employee/addEmployee', employeeInformationDto);
    }

    getHolidays()
    {
        return this.http.get<Holidays []>(this.baseApiUrl+'/getHolidays');
    }

    updateLeave( formData: any)
    {
        return this.http.post(this.baseApiUrl+'/updateLeave',formData)
            .pipe(
                map((data: any) => {
                  return data;
                }), catchError( error => {
                  return throwError( 'Something went wrong!' );
                })
             )
    }
//for meal Cupan
    getMealCupan(employeeInformationDto:EmployeeInformationDto []) {

        return this.http.post(this.baseApiUrl+'/getMealCupan', employeeInformationDto, {responseType: 'blob' });
    }
    // for Shift Allownce
    getShiftallownce(employeeInformationDto:EmployeeInformationDto []) {

        return this.http.post(this.baseApiUrl+'/getShiftallownce', employeeInformationDto, {responseType: 'blob' });
    }

    addHoliday(holiday:any) {
        return this.http.post(this.baseApiUrl+'/addHoliday',holiday)
    }

    checkPassword(user:any)
    {
        return this.http.post(this.baseApiUrl+'/employee/checkpassword',user)
    }

    updatePassword(user:any)
    {
        return this.http.post(this.baseApiUrl+'/employee/changepassword',user)
    }

    getAllRoles()
    {
        return this.http.get<any []>('http://localhost:8082/allroles');

}
}
