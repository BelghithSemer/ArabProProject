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
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemandInfoDialogComponent } from './Components/DemandeModule/demand-info-dialog/demand-info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './Components/UserManagment/users/users.component';
import { ProjectsComponent } from './Components/ProjectManagement/projects/projects.component';
import { AddProjectComponent } from './Components/ProjectManagement/add-project/add-project.component';
import { TasksComponent } from './Components/ProjectManagement/tasks/tasks.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    SideBarComponent,
    AddDemandeComponent,
    ListDemandeComponent,
    DemandInfoDialogComponent,
    UsersComponent,
    ProjectsComponent,
    AddProjectComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
