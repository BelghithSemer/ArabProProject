import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Demande, DemandState } from 'src/app/models/Demande';
import { Notif } from 'src/app/models/Notif';
import { DemandeService } from 'src/app/Services/demande.service';
import { NotifService } from 'src/app/Services/notif.service';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddDemandeComponent {
  demandeForm: FormGroup;
  demande : Demande;
  notif : Notif;
  constructor(private fb: FormBuilder, private serv:DemandeService, private notifservice:NotifService) {
    this.demandeForm = this.fb.group({
      typeDeDemande: ['Demande Conge'], // Default selection
      description: ['']
    });
    this.demande = {
      id:0,
      typeDemande : "",
      description :"",
      idDemandeur:0,
      idAdmin:0,
      idChef:0,
      dateCreation: new Date(),
      dateValidationFinale: new Date(),
      dateValidationPartielle: new Date(),
      state: DemandState.SOUMISE
    }
    this.notif = {
      id:0,
      content:"",
      type:"",
      request: this.demande,
    }
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.demande.description = this.demandeForm.value.description;
    this.demande.typeDemande = this.demandeForm.value.typeDeDemande;
    this.demande.idDemandeur = parseInt(sessionStorage.getItem('id') || '0');
    this.serv.addDemande(this.demande).subscribe((data)=>{
      console.log(data);
      this.notif.type = "Request";
      this.notif.content = this.demande.typeDemande;
      this.notif.request = data;
      this.notifservice.SendRequestNotif(this.notif).subscribe((data)=> {
        console.log(data);
      });
    })

  }
}
