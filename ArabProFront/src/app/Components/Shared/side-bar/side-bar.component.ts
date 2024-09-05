import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/loginResponse';
import { Notif } from 'src/app/models/Notif';
import { NotifService } from 'src/app/Services/notif.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
 
  notifs : Notif[] = [];
  user : LoginResponse;
  constructor(private serv:NotifService, private router: Router){
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
  this.serv.ShowAllNotifs().subscribe((data)=>{
    console.log(data);
    this.notifs=data;
  })
 }

 LogOut() {
  // Clear all session storage
  sessionStorage.clear();

  // Navigate to the login page
  this.router.navigate(['/login']);
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
