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
  currentTypeClass: string = 'conge-field'; // Default to Conge
  currentButtonClass: string = 'conge-button'; // Default to Conge button
  constructor(private fb: FormBuilder, private serv:DemandeService, private notifservice:NotifService) {
    this.demandeForm = this.fb.group({
      typeDeDemande: ['Demande Conge'], // Default selection
      description: [''],
      dateDebut: [''], // Default fields
      dateSortie: [''], 
      montantDemande: [''],
      duree: ['']
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
      state: DemandState.SOUMISE,
      duree:0,
      dateDebut:new Date,
      dateSortie:new Date,
      montantdemande: 0
    }
    this.notif = {
      id:0,
      content:"",
      type:"",
      request: this.demande,
    }
  }

  ngOnInit(): void {
    this.demandeForm.get('typeDeDemande')?.valueChanges.subscribe(selectedType => {
      this.updateFormFields(selectedType);
      this.updateFieldStyles(selectedType);
    });

    // Initialize form based on default type
    this.updateFormFields(this.demandeForm.get('typeDeDemande')?.value);
    this.updateFieldStyles(this.demandeForm.get('typeDeDemande')?.value);
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
        alert('Request Sent ! ');
      });
    })

  }

  updateFormFields(selectedType: string): void {
    // Reset form fields that are conditionally added
    this.demandeForm.removeControl('dateDebut');
    this.demandeForm.removeControl('dateSortie');
    this.demandeForm.removeControl('montantDemande');
    this.demandeForm.removeControl('duree');
  
    if (selectedType === 'Demande Conge') {
      this.demandeForm.addControl('dateDebut', this.fb.control(''));
      this.demandeForm.addControl('dateSortie', this.fb.control(''));
    } else if (selectedType === 'Demande pret-avance') {
      this.demandeForm.addControl('montantDemande', this.fb.control(''));
    } else if (selectedType === 'Demande Auto-Sortie') {
      this.demandeForm.addControl('dateDebut', this.fb.control('')); // Date and Time
      this.demandeForm.addControl('duree', this.fb.control('')); // Duration in minutes
    }
  }

  updateFieldStyles(selectedType: string): void {
    switch (selectedType) {
      case 'Demande Conge':
        this.currentTypeClass = 'conge-field';
        this.currentButtonClass = 'conge-button';
        break;
      case 'Demande pret-avance':
        this.currentTypeClass = 'pret-avance-field';
        this.currentButtonClass = 'pret-avance-button';
        break;
      case 'Demande Auto-Sortie':
        this.currentTypeClass = 'auto-sortie-field';
        this.currentButtonClass = 'auto-sortie-button';
        break;
      default:
        this.currentTypeClass = '';
        this.currentButtonClass = '';
        break;
    }
  }
}
