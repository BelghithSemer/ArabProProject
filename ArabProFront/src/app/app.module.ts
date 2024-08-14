import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './Components/Auth/sign-in/sign-in.component';
import { SideBarComponent } from './Components/Shared/side-bar/side-bar.component';
import { AddDemandeComponent } from './Components/DemandeModule/add-demande/add-demande.component';
import { ListDemandeComponent } from './Components/DemandeModule/list-demande/list-demande.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    SideBarComponent,
    AddDemandeComponent,
    ListDemandeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
