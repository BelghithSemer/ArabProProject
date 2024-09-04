import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  GetUser(id:number){
    return this.http.get<User>('http://localhost:8080/users/show/'+id);
  }

  GetUsers(){
    return this.http.get<User[]>('http://localhost:8080/users/show');
  }

  UpdateUser(u:User){
    return this.http.put<User>('http://localhost:8080/users/update',u);
  }


}
