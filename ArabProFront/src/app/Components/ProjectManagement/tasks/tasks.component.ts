import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  projectId!: number;
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.project = {
      id : 0,
      etat: 'OnGoing',
      description :'nothing',
      manager : undefined,
      libelle : ''
    }
  }

  ngOnInit(): void {
    // Extract the projectId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('id')!; 
      console.log(this.projectId);
      this.getProject();
    });
  }

  getProject(): void {
    // Fetch the project details using the projectId
    this.projectService.GetProject(this.projectId).subscribe(
      (data) => {
        //this.project = data;
        console.log('Project details:', data);
      }
    );
  }
}
