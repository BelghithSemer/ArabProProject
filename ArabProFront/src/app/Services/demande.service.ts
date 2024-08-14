import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../models/Demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http:HttpClient) { }


  addDemande(dem:Demande){
    return this.http.post('http://localhost:8080/demands/add',dem);
  }

  getAll(){
    return this.http.get<Demande[]>('http://localhost:8080/demands/show');
  }
}
