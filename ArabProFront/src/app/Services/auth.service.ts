import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequest } from '../models/signUpRequest';
import { SignInRequest } from '../models/SignInRequest';
import { LoginResponse } from '../models/loginResponse';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(request:SignUpRequest){
    return this.http.post<User>('http://localhost:8080/api/auth/signup',request);  
  }

  login(request : SignInRequest){
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/signin',request)
  }


}
