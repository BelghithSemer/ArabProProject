import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/Project';

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
}
