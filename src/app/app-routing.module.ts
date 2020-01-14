import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{DashboardComponent}  from './component/dashboard/dashboard.component';
import{LoginComponent} from './component/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { MgrDashboardComponent } from './component/mgr-dashboard/mgr-dashboard.component';
import { Role } from './model/role';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: 'mgr-dashboard', component: MgrDashboardComponent ,
  canActivate: [AuthGuard], data: { roles: [Role.Manager, Role.Lead] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
