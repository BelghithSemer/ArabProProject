import { Component } from '@angular/core';
import { Demande } from 'src/app/models/Demande';
import { DemandeService } from 'src/app/Services/demande.service';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent {
listdemande : Demande[] = [];

constructor(private serv:DemandeService){}

ngOnInit(){
  this.serv.getAll().subscribe((data)=>{
    this.listdemande = data;
    console.log(this.listdemande)
  })
}
}
