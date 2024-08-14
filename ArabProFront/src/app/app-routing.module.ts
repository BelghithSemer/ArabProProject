import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { SignInComponent } from './Components/Auth/sign-in/sign-in.component';
import { AddDemandeComponent } from './Components/DemandeModule/add-demande/add-demande.component';
import { ListDemandeComponent } from './Components/DemandeModule/list-demande/list-demande.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  {path:'register', component:SignUpComponent},
  {path:'login', component:SignInComponent},
  {path:'add-request', component:AddDemandeComponent},
  {path:'requests', component:ListDemandeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
