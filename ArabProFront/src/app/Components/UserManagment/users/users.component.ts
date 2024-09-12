import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from 'src/app/models/loginResponse';
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
  roles: string[] = ['chef', 'employe'];
  signuprequest !: SignUpRequest;
  user : LoginResponse;
  chefs: User[] = [];
  constructor(private serv:UserService,private fb: FormBuilder, private authServ: AuthService){
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      team: ['']
    });

    this.signuprequest = {
      email:"",
      password:"",
      username:"",
      role :[]
    }
    this.user = {
      accessToken: sessionStorage.getItem('accessToken') || '',
      username: sessionStorage.getItem('username') || '',
      email: sessionStorage.getItem('email') || '',
      id: parseInt(sessionStorage.getItem('id')|| '') || 0,
      roles: JSON.parse(sessionStorage.getItem('roles') || '[]'),
      tokenType: sessionStorage.getItem('tokenType') || '',
    }
  }
  ngOnInit(){
    
      this.serv.GetUsers().subscribe((data)=>{
        this.users = data;
        console.log('users : ',this.users)
        if (this.user.roles.includes('ROLE_CHEF')){
          this.users = this.users.filter(user => 
            //user.roles.some(role => role.name === 'ROLE_EMPLOYEE')
            user.idDep === this.user.id
            
          );
          console.log('Filtered users (ROLE_EMPLOYEE): ', this.users);
          
        }
        this.chefs = this.users.filter(user => 
          user.roles.some(role => role.name === 'ROLE_CHEF'));
          console.log('Filtered users (ROLE_CHEF): ', this.chefs);
      })
    

      this.authForm.get('role')?.valueChanges.subscribe(role => {
        if (role === 'Employee') {
          this.authForm.get('team')?.setValidators(Validators.required);
        } else {
          this.authForm.get('team')?.clearValidators();
        }
        this.authForm.get('team')?.updateValueAndValidity();
      });
    
    
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
      //console.log(this.authForm.value);
      this.signuprequest.email = this.authForm.value.email;
      this.signuprequest.username = this.authForm.value.username;
      this.signuprequest.password = this.authForm.value.password;
      this.signuprequest.role.push( this.authForm.value.role);
      console.log(this.signuprequest);
      console.log('Team Lead',this.authForm.value.team);
      this.authServ.register(this.signuprequest).subscribe((data)=>{
        console.log(data);
        if(this.authForm.value.team != null){
        data.idDep = this.authForm.value.team.id;
        this.serv.UpdateUser(data).subscribe((res)=>{
          console.log("Added Chef",res);
        })
        }
        
      })
      // After submission, you can close the modal like this:
      const modalElement = document.getElementById('addCustomerModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    }
  }



  block(stat : string , user : User){
    if(stat === 'block'){
      user.blocked = true;
    }else{
      user.blocked = false;
    }
    this.serv.UpdateUser(user).subscribe((data)=>console.log(data));
  }



  isAdmin(): boolean {
    return this.user.roles.includes('ROLE_ADMIN') ;
  }
  isChef(): boolean {
    return  this.user.roles.includes('ROLE_CHEF');
  }
  // Check if the user has 'ROLE_EMPLOYEE'
  isEmployee(): boolean {
    return this.user.roles.includes('ROLE_EMPLOYEE');
  }

}
