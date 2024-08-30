import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(){
    console.log('anything');
    this.ps.GetAll().subscribe((data)=>{
      this.projects = data;
      console.log("Project List",this.projects);
    });
  }

  AddProject(){
    this.router.navigate(['add-project']);
  }
}
