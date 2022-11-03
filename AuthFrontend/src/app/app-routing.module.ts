import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {AuthGuard} from "./auth.guard";
import {AccountComponent} from "./component/account/account.component";
import {AddBugComponent} from "./component/add-bug/add-bug.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full', },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard]},
  {path: 'account', component: AccountComponent, canActivate : [AuthGuard]},
  {path: 'addBug', component: AddBugComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
