import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../shared/apicall.service';
import { UserService } from '../../shared/userService/user.service';
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public apicalService : ApicallService, public userService : UserService){ }

  localStorage!: any;
  username!: any;

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
    console.log("user loggato come: ",this.username)
    this.localStorage = localStorage.getItem('token')
    if(localStorage.getItem('token')) {

      this.apicalService.gotoDashboard(localStorage.getItem('token')).subscribe((res : any) =>{
        if(res && res['status'] === 'ok'){
          console.log('we are in dashboard')
        } else {
          console.log('something went wrong in dashboard...!')
        }
      }, (err) => {
        if(err) {
          console.log('we got an error dash..')
        }
      })
    }

  }


}
