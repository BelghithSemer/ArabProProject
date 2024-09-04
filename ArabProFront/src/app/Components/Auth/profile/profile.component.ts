import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  personalInfoForm : FormGroup;
  user !: User;

  constructor(private fb:FormBuilder, private userService: UserService){
    this.personalInfoForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      poste: ['', Validators.required],
      sexe: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      lieuNaissance: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.patchFormWithUserData();
  }
  onSubmit(){
    if (this.personalInfoForm.valid) {
      this.user.dateNaissance = this.personalInfoForm.value.dateNaissance;
      this.user.nom = this.personalInfoForm.value.nom;
      this.user.prenom = this.personalInfoForm.value.prenom;
      this.user.tel = this.personalInfoForm.value.tel;
      this.user.poste = this.personalInfoForm.value.poste;
      this.user.sexe = this.personalInfoForm.value.sexe;
      this.user.lieuNaissance = this.personalInfoForm.value.lieuNaissance;
      this.user.experience = this.personalInfoForm.value.experience;
      this.user.idDep = 0;
      this.user.matricule = 619;
      //this.user.soldeCongé = ' yes ';

      this.userService.UpdateUser(this.user).subscribe((data)=>{
        console.log('Uodated User : ',data);
      })
      //console.log('Form Data:', this.personalInfoForm.value);
      // Handle form submission logic
    }
  }

  private patchFormWithUserData() {
    const userId = sessionStorage.getItem('id'); // Assuming 'userId' is stored in sessionStorage
    if (userId) {
      this.userService.GetUser(parseInt(userId)).subscribe(
        (user) => {
          this.user  = user ;
          console.log('User Data : ',this.user);
          this.personalInfoForm.patchValue({
            nom: user.nom,
            prenom: user.prenom,
            tel: user.tel,
            poste: user.poste,
            sexe: user.sexe,
            dateNaissance: user.dateNaissance,
            lieuNaissance: user.lieuNaissance,
            experience: user.experience
          });
        }
      );
    }
  }



}
