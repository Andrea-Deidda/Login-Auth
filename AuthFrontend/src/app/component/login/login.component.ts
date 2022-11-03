import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApicallService } from '../../shared/apicall.service';
import { Router } from '@angular/router';
import {UserService} from "../../shared/userService/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId!: any;
  userdata!: any;

  loginUserForm : FormGroup;
  constructor(public apicallService : ApicallService, public router : Router, public userService : UserService) {
    this.loginUserForm = new FormGroup({
      email : new FormControl('' , [Validators.email, Validators.required]),
      password : new FormControl('' , [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  OnSubmit(){
    if (this.loginUserForm.valid){
      this.apicallService.login(this.loginUserForm.value).subscribe((res : any) => {
        if(res && res.status === 'ok' && res.data.response && res.data.authToken) {
          localStorage.setItem('token', res.data.authToken)
          console.log(res)
          console.log(this.loginUserForm.value.email)
          sessionStorage.setItem('username', this.loginUserForm.value.email)
          this.router.navigate(['/dashboard'])

        } else {
          console.log("pass errata")
          window.alert("password errata")
          window.location.reload()
      }
      }
      , (err) => {
        console.log('We got an error in Login.....!')
      })
    } else {
      console.log("username e/o password errato")
      window.alert("username e/o password errata")
  }
    console.log(this.loginUserForm.value)
    this.userdata = this.loginUserForm.value
  }

}
