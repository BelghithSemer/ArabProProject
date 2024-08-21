import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../models/Demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http:HttpClient) { }


  addDemande(dem:Demande){
    return this.http.post<Demande>('http://localhost:8080/demands/add',dem);
  }

  getAll(){
    return this.http.get<Demande[]>('http://localhost:8080/demands/show');
  }

  update(dem:Demande){
    return this.http.put('http://localhost:8080/demands/update',dem);
  }

  delete(id:number){
    return this.http.delete<string>('http://localhost:8080/demands/delete/'+id);
  }

  sendmail(dem:Demande){
    return this.http.post('http://localhost:8080/demands/sendmail',dem);
  }

  
}
