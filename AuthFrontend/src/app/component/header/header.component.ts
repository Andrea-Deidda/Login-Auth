import { Component, OnInit } from '@angular/core';
import {ApicallService} from "../../shared/apicall.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public apicallService : ApicallService) { }

  isLogged!:any;

  ngOnInit(): void {
    this.isloggedin();
  }

  isloggedin(){
  }

 logout(){
    this.apicallService.logOut();
    this.isLogged = false
    window.location.reload();
 }

}
