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
  reloadPage = true;

  ngOnInit(): void {
    this.logout()
  }

  logout(){
    if (localStorage.getItem('token') && sessionStorage.getItem('username')){
      this.isLogged = true
      if(this.reloadPage){
      }
    } else {
      this.isLogged = false;
    }
    console.log(this.isLogged)
  }

}
