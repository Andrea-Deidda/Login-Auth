import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL= "http://localhost:3000/auth/getUser/"

  constructor(public http : HttpClient) { }

  getUserById(id: any){
    return this.http.get<any>(this.URL + id)
  }

}


