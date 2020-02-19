import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{DashboardComponent}  from './component/dashboard/dashboard.component';
import{LoginComponent} from './component/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { MgrDashboardComponent } from './component/mgr-dashboard/mgr-dashboard.component';
import { Role } from './model/role';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { HolidaysCalendarComponent } from './holidays-calendar/holidays-calendar.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'holidays', component: HolidaysCalendarComponent },
  { path: '', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: 'mgr-dashboard', component: MgrDashboardComponent ,
  canActivate: [AuthGuard], data: { roles: [Role.Manager, Role.Lead] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
