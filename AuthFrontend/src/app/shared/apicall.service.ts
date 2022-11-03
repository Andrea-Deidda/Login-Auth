import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(public http : HttpClient) { }

  login(userData: any){
    return this.http.post('http://localhost:3000/auth/login', userData )
  }

  logOut() {
    sessionStorage.clear()
    localStorage.clear()
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  registerUser(userData: any){
    return this.http.post('http://localhost:3000/auth/register', userData)
  }


  getUserByEmail(email : any, token: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>('http://localhost:3000/auth/getUser/' + email , {headers : headers})
  }


  updateUser(email : any, userData : any){
    return this.http.patch<any>('http://localhost:3000/auth/updateUser/' + email, userData)
  }

/*  gotoDashboard(token: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>('http://localhost:3000/auth/dashboard', {headers : headers})
  }*/


}
