import { Component, OnInit } from '@angular/core';
import {ApicallService} from "../../shared/apicall.service";
import {UserService} from "../../shared/userService/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  UserRegistrationForm : FormGroup

  constructor(public apicalService : ApicallService, public userService : UserService, public router : Router){
    this.UserRegistrationForm = new FormGroup({
      username : new FormControl('', ),
      email : new FormControl('', [Validators.email]),
      dob : new FormControl('', )
    })
  }

  localStorage!: any;
  username!: any;
  dob : any
  email: any
  gender : any
  password: any
  ELEMENT_DATA: any

  control = false

  displayedColumns: string[] = [this.username];

  ngOnInit(): void {
    this.getUserByEmail();
    //this.username = sessionStorage.getItem('username')
    //this.localStorage = localStorage.getItem('token')
  }

  getUserByEmail(){
    this.apicalService.getUserByEmail(sessionStorage.getItem('username'), localStorage.getItem('token')).subscribe((res : any) =>{
      this.localStorage = localStorage.getItem('token')
      this.username = res.username
      this.dob = res.dob.split('T', 1)
      this.email = res.email
      this.gender = res.gender
      this.ELEMENT_DATA = res
    })
  }





  OnSubmit(){
    if(this.UserRegistrationForm.valid){
      console.log('user form value is ', this.UserRegistrationForm.value)
      console.log(sessionStorage.getItem('username'))

      if(this.UserRegistrationForm.value.email === ''){
        this.UserRegistrationForm.value.email = sessionStorage.getItem('username')
        this.control = true
      }

      if(this.UserRegistrationForm.value.dob === ''){
        this.UserRegistrationForm.value.dob = this.dob

      }

      if(this.UserRegistrationForm.value.username === ''){
        this.UserRegistrationForm.value.dob = this.username
      }

      this.apicalService.updateUser(sessionStorage.getItem('username'), this.UserRegistrationForm.value).subscribe((res : any) => {
        if(this.UserRegistrationForm.value.email != '' && this.control == false){
          console.log('è stata cambiata l' + 'email')
          window.alert("è stata modificata l'email riesegui il login per confermare i cambiamenti ")
          this.apicalService.logOut();
          this.router.navigate(['/login'])
        }

        console.log("utente aggiornato" , this.UserRegistrationForm.value.email)
        window.location.reload()

      })
    }
  }
}
