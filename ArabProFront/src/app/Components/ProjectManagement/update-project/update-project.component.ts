import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/Services/project.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent {


  projectForm: FormGroup;
  users: User[] = [];
  projectId!: number;
  project: Project;
  constructor(private fb:FormBuilder, private us:UserService, private route: ActivatedRoute,private ps: ProjectService, private router: Router){

    this.projectForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      manager: ['', Validators.required],
      date:['', Validators.required],
      
    });
    this.project = {
      id : 0,
      etat: 'OnGoing',
      description :'nothing',
      manager : undefined,
      libelle : '',
      date : new Date()
    }
  }

  ngOnInit(){
    this.us.GetUsers().subscribe((data) => {
      // Filter users to only keep those with the 'ROLE_CHEF' role
      this.users = data;
      console.log('users',this.users);
      this.users = data.filter(user => 
        user.roles.some(role => role.name === 'ROLE_CHEF')
      );
    });
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('id')!; 
      console.log(this.projectId);
      this.ps.GetProject(this.projectId).subscribe((data)=>{
        this.project = data;
        console.log(this.project);
        //this.projectForm.patchValue(this.project);
        this.projectForm.patchValue({
          libelle: this.project.libelle,
          description: this.project.description,
          manager: this.project.manager, // Assign the found manager object
          date: this.project.date,
        });
      })
    });
  }

  onSubmit(){
    if (this.projectForm.valid) {
      this.project.description = this.projectForm.value.description;
      this.project.libelle = this.projectForm.value.libelle;
      this.project.manager = this.projectForm.value.manager;
      this.project.date = this.projectForm.value.date;
      console.log('Project:', this.project);
      // Handle submission, e.g., call a service to save the project
      this.ps.updateProject(this.project).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['/projects']);
      })
    }
  }


}
