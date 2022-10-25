import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public apicalService : ApicallService) { }

  localStorage!: any;

  ngOnInit(): void {
    this.localStorage = localStorage.getItem('token')
    if(localStorage.getItem('token')) {
      console.log(localStorage)
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
