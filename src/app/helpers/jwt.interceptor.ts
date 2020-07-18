import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}
    public baseApiUrl = environment.base_api_url;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    'Authorization': `Bearer ${currentUser.token}`,
                    'Access-Control-Allow-Origin': this.baseApiUrl 
                }               
            });
            console.log(request);
        }

        return next.handle(request);
    }

    
}