import { ForwardRefHandling } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('confirmPassword', { static: false }) confirmPassword!: ElementRef;

  genderValues = [
    {name : 'Male', value : 'male'},
    {name : 'Female', value : 'female'},
    {name : 'Others', value : 'others'},
  ];

  UserRegistrationForm : FormGroup

  constructor(public apicallService : ApicallService, public router : Router) { 
    this.UserRegistrationForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.email, Validators.required]),
      password : new FormControl('', [Validators.required]),
      gender : new FormControl('', [Validators.required]),
      dob : new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }

  OnSubmit(){
    if(this.UserRegistrationForm.valid && this.UserRegistrationForm.value.password === this.confirmPassword.nativeElement.value){
      console.log('user form value is ', this.UserRegistrationForm.value)
      this.apicallService.registerUser(this.UserRegistrationForm.value).subscribe( (res : any) => {
        if(res && res['status'] === 'ok' && res['data']['_id']) {
          this.router.navigate(['/login'])
        }
      } , (err) => {
        if(err) {
          console.log('We got an error in signup.....!')
        }
      })
    } 
  } 

}
