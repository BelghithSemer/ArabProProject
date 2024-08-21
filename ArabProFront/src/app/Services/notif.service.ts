import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notif } from '../models/Notif';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(private http:HttpClient) { }


  SendRequestNotif(notif:Notif){
    return this.http.post('http://localhost:8080/notif/add',notif);
  }

  ShowAllNotifs(){
    return this.http.get<Notif[]>('http://localhost:8080/notif/show');
  }



}
