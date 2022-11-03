import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BugService} from "../../shared/userService/bug.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css']
})
export class AddBugComponent implements OnInit {

  severityValues = [
    {name : 'Critical', value : 'critical'},
    {name : 'High', value : 'high'},
    {name : 'Medium', value : 'medium'},
    {name : 'Low', value : 'low'},
  ];

  statusValues = [
    {name : 'Open', value : 'open'},
    {name : 'Active', value : 'active'},
    {name : 'Released', value : 'released'},
    {name : 'Rejected', value : 'rejected'},
  ];

  AddBugForm : FormGroup

  constructor(public bugService : BugService, public router : Router ) {
    this.AddBugForm = new FormGroup({
      title : new FormControl('', [Validators.required]),
      status : new FormControl('', [Validators.required]),
      severity : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      dob : new FormControl('', [Validators.required]),
      username : new FormControl()
  })}

  ngOnInit(): void {
  }

  OnSubmit(){
    if(this.AddBugForm.valid ){
      this.AddBugForm.value.username = sessionStorage.getItem('username')
      console.log('user form value is ', this.AddBugForm.value)
      this.bugService.addBug(this.AddBugForm.value).subscribe( (res : any) => {
          window.alert('Bug creato con successo')
          this.router.navigate(['/dashboard'])

      } , (err) => {
        if(err) {
          console.log('We got an error in addBug.....!')
        }
      })
    }


  }
}
