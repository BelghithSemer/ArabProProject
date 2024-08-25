import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpRequest } from 'src/app/models/signUpRequest';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users : User[] =  [];
  authForm: FormGroup;
  roles: string[] = ['ROLE_CHEF', 'ROLE_EMPLOYEE'];
  signuprequest !: SignUpRequest;
  constructor(private serv:UserService,private fb: FormBuilder, private authServ: AuthService){
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });

    this.signuprequest = {
      email:"",
      password:"",
      username:"",
      role :[]
    }
  }
  ngOnInit(){
    this.serv.GetUsers().subscribe((data)=>{
      this.users = data;
      console.log('users : ',this.users)
    })
  }



  openModal() {
    const modalElement = document.getElementById('addCustomerModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  onSubmit() {
    if (this.authForm.valid) {
      // Handle form submission logic here
      console.log(this.authForm.value);
      this.signuprequest.email = this.authForm.value.email;
      this.signuprequest.username = this.authForm.value.username;
      this.signuprequest.password = this.authForm.value.password;
      this.signuprequest.role.push( this.authForm.value.role);
      this.authServ.register(this.signuprequest).subscribe((data)=>{
        console.log(data)
      })
      // After submission, you can close the modal like this:
      const modalElement = document.getElementById('addCustomerModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    }
  }

}
