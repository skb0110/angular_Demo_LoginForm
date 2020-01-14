import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  HttpResponse ,HttpHeaders} from '@angular/common/http';


import { User } from '../model/user';
import{Leads} from'../model/leads';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient    )
     { }

     
    getLeadNames() {
        return this.http.get<Leads>(`http://localhost:8082/getleadNames`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }
}