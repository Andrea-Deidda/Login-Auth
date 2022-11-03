import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../shared/apicall.service';
import { UserService } from '../../shared/userService/user.service';
import {LoginComponent} from "../login/login.component";
import {BugService} from "../../shared/userService/bug.service";
import {BugData} from "../../models/bugData.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bugs : BugData[] = []

  constructor(public bugService : BugService, public apicallService : ApicallService){ }

  localStorage!: any;
  username!: any;
  email: any
  ELEMENT_DATA: any
  count : number = 0

  ngOnInit(): void {
    this.getAllBug();
    this.getUserByEmail();
  }

  getAllBug(){
    this.bugService.getAllBug().subscribe((res : any) =>{
      console.log(res)
      this.bugs = res
      for( let i = 0; i<this.bugs.length; i++){
        if(sessionStorage.getItem('username') === this.bugs[i].username ) {
          console.log(this.bugs[i].username)
          this.count++
        }
      }
      console.log(this.count)
    })
  }

  getUserByEmail(){
    this.apicallService.getUserByEmail(sessionStorage.getItem('username'), localStorage.getItem('token')).subscribe((res : any) =>{
      this.localStorage = localStorage.getItem('token')
      this.username = res.username
      this.email = res.email
      this.ELEMENT_DATA = res
    })


  }
}
