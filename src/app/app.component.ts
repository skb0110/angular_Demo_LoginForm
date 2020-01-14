import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './service/authentication.service';
import { User } from './model/user';
import { Role } from './model/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    get isManager() {
        return this.currentUser && ( this.currentUser.roles.roleNames === Role.Manager || this.currentUser.roles.roleNames === Role.Lead);
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}