import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Demande, DemandState } from 'src/app/models/Demande';
import { DemandeService } from 'src/app/Services/demande.service';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddDemandeComponent {
  demandeForm: FormGroup;
  demande : Demande
  constructor(private fb: FormBuilder, private serv:DemandeService) {
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
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.demande.description = this.demandeForm.value.description;
    this.demande.typeDemande = this.demandeForm.value.typeDeDemande;
    this.serv.addDemande(this.demande).subscribe((data)=>{
      console.log(data);
    })

  }
}
