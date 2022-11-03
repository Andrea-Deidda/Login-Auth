import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(public http: HttpClient) { }

  URL = 'http://localhost:3000/bug/'

  addBug(bugData : any){
    return this.http.post(this.URL + 'addbug',  bugData)
  }

  getAllBug(){
    return this.http.get<any>(this.URL + 'getAllBug' )
  }
}
