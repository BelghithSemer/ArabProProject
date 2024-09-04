import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/loginResponse';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projects: Project[] = []
  constructor(private ps:ProjectService,private router:Router){}
  user!:LoginResponse;
  ngOnInit(){
    console.log('anything');
    this.ps.GetAll().subscribe((data)=>{
      this.projects = data;
      console.log("Project List",this.projects);
    });
    // Current User 
    this.user = {
      accessToken: sessionStorage.getItem('accessToken') || '',
      username: sessionStorage.getItem('username') || '',
      email: sessionStorage.getItem('email') || '',
      id: parseInt(sessionStorage.getItem('id') || '') || 0,
      roles: JSON.parse(sessionStorage.getItem('roles') || '[]'),
      tokenType: sessionStorage.getItem('tokenType') || '',
    };
  
    
  }

  AddProject(){
    this.router.navigate(['add-project']);
  }


  // Check if the user has 'ROLE_ADMIN' or 'ROLE_CHEF'
  isAdmin(): boolean {
    return this.user.roles.includes('ROLE_ADMIN');
  }

  // Check if the user has 'ROLE_EMPLOYEE'
  isEmployee(): boolean {
    return this.user.roles.includes('ROLE_EMPLOYEE');
  }
}
