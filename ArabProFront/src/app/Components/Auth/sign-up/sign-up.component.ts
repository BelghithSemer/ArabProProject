import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpRequest } from 'src/app/models/signUpRequest';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  authForm: FormGroup;
  req:SignUpRequest;
  constructor(private fb: FormBuilder, private serv:AuthService) {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ROLE_ADMIN']  // Default role, you can change it as needed
    });

    this.req = {
      email:"",
      password:"",
      username:"",
      role :[]
    }
  }

  ngOnInit() {
    
  }

  onSubmit() {
    if (this.authForm.valid) {
      //console.log(this.authForm.value);
      // Implement the API call to submit the form data
      this.req.email = this.authForm.value.email;
      this.req.password = this.authForm.value.password;
      this.req.role.push(this.authForm.value.role);
      this.req.username = this.authForm.value.username;
      console.log(this.req);

      this.serv.register(this.req).subscribe((data)=>{
        console.log(data);
      })
    }
  }
}
