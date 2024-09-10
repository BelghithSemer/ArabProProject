import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }


  GetAll(){
    return this.http.get<Project[]>('http://localhost:8080/project/show');
  }

  Add(p : Project){
    return this.http.post<Project>('http://localhost:8080/project/add',p);
  }

  GetProject(id:number){
    return this.http.get<Project>('http://localhost:8080/project/show/'+id);
  }
  AddTask(task : Task){
    return this.http.post<Task>('http://localhost:8080/tasks/add',task);
  }
  GetAllTasks(){
    return this.http.get<Task[]>('http://localhost:8080/tasks/show');
  }
  updateTask(task: Task){
    return this.http.put<Task>('http://localhost:8080/tasks/update',task);
  }

  updateProject(project: Project){
    return this.http.put<Project>('http://localhost:8080/project/update',project);
  }

  deleteTask(id : number){
    return this.http.delete('http://localhost:8080/tasks/delete/'+id);
  }
}
