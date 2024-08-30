import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/Services/project.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  projectForm!: FormGroup;
  users: User[] = [];
  project : Project;
  constructor(private fb: FormBuilder, private ps: ProjectService, private us:UserService, private router:Router) {
    this.project = {
      id : 0,
      etat: 'OnGoing',
      description :'nothing',
      manager : undefined,
      libelle : ''
    }
  }

  ngOnInit() {
    this.initForm();
    this.loadUsers();
  }

  initForm() {
    this.projectForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      manager: ['', Validators.required]
    });
  }

  loadUsers() {
    this.us.GetUsers().subscribe((data) => {
      // Filter users to only keep those with the 'ROLE_CHEF' role
      this.users = data;
      console.log('users',this.users);
      this.users = data.filter(user => 
        user.roles.some(role => role.name === 'ROLE_CHEF')
      );
    });
  }
  

  onSubmit() {
    if (this.projectForm.valid) {
      this.project.description = this.projectForm.value.description;
      this.project.libelle = this.projectForm.value.libelle;
      this.project.manager = this.projectForm.value.manager;
      console.log('Project:', this.project);
      // Handle submission, e.g., call a service to save the project
      this.ps.Add(this.project).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['/projects']);
      })
    }
  }



}
