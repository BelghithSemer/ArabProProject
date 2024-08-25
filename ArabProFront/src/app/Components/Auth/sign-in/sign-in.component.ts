import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInRequest } from 'src/app/models/SignInRequest';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;
  req : SignInRequest;
  constructor(private fb: FormBuilder,private serv:AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.req = {
      username : "",
      password : ""
    }
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Login Data:', loginData);
      // Handle the login logic here
      this.req.password = this.loginForm.value.password;
      this.req.username = this.loginForm.value.username;

      this.serv.login(this.req).subscribe((data)=>{
        console.log(data);
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('roles', JSON.stringify(data.roles));
        sessionStorage.setItem('id', data.id.toString());
      })

    }
  }
}
