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
  this.serv.ShowAllNotifs().subscribe((data) => {
    console.log(data);
    this.notifs = data;
  
    if (this.isAdmin() || this.isChef()) {
      // Show all notifications of type 'Request'
      this.notifs = this.notifs.filter(notif => notif.type === 'Request');
    } else if (this.isEmployee()) {
      // Show 'Request' type notifications and specific 'Task' notifications
      this.notifs = this.notifs.filter(notif => 
        
        (notif.type === 'Task' && notif.task?.employee?.username === this.user.username)
      );
    }
  });
  
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


Navigate(n: Notif){
  if(n.type === 'Task'){
    this.router.navigate(['/tasks',n.task?.project?.id])
  }else{
    this.router.navigate(['/requests']);
  }
}

}
