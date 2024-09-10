import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { SignInComponent } from './Components/Auth/sign-in/sign-in.component';
import { AddDemandeComponent } from './Components/DemandeModule/add-demande/add-demande.component';
import { ListDemandeComponent } from './Components/DemandeModule/list-demande/list-demande.component';
import { UsersComponent } from './Components/UserManagment/users/users.component';
import { ProjectsComponent } from './Components/ProjectManagement/projects/projects.component';
import { AddProjectComponent } from './Components/ProjectManagement/add-project/add-project.component';
import { TasksComponent } from './Components/ProjectManagement/tasks/tasks.component';
import { UpdateProjectComponent } from './Components/ProjectManagement/update-project/update-project.component';
import { ProfileComponent } from './Components/Auth/profile/profile.component';
import { DashboardComponent } from './Components/Auth/dashboard/dashboard.component';
import { TasksVerificationComponent } from './Components/ProjectManagement/tasks-verification/tasks-verification.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'register', component:SignUpComponent},
  {path:'login', component:SignInComponent},
  {path:'add-request', component:AddDemandeComponent},
  {path:'requests', component:ListDemandeComponent},
  {path: 'users', component:UsersComponent},
  {path: 'projects', component:ProjectsComponent},
  {path: 'add-project', component: AddProjectComponent},
  {path: 'tasks/:id', component: TasksComponent},
  {path: 'update-project/:id', component: UpdateProjectComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tasks-verif', component: TasksVerificationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
