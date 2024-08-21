import { Component } from '@angular/core';
import { Demande, DemandState } from 'src/app/models/Demande';
import { DemandeService } from 'src/app/Services/demande.service';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent {
listdemande : Demande[] = [];
DemandState = DemandState;
constructor(private serv:DemandeService){}

ngOnInit(){
  this.serv.getAll().subscribe((data)=>{
    this.listdemande = data;
    console.log(this.listdemande)
    console.log('First Demand State:', this.listdemande[0]?.state);

  })

}

Repondre(dem: Demande, res: string) {
  const roles = sessionStorage.getItem('roles');
  
  if (roles && roles.includes('ROLE_CHEF')) {
    
      dem.state = DemandState.PARTIELLEMENT_VALIDEE; // Example of updating status
      dem.idChef = parseInt(sessionStorage.getItem('id') || '0');

    
  } else if ( roles && roles.includes('ROLE_ADMIN')) {
    if(res == 'accept'){
      dem.state = DemandState.VALIDEE;
      this.serv.sendmail(dem).subscribe((data)=>{
        console.log(data);
      })
    }  else {
      dem.state = DemandState.REFUSEE
    }
    dem.idAdmin = parseInt(sessionStorage.getItem('id') || '0');
  
  }else {
    alert('Permission Denied ! ')
  }

  this.serv.update(dem).subscribe((data)=>{
    console.log(data);
  })

}

Delete(id:number){
  const roles = sessionStorage.getItem('roles');
  if (roles && roles.includes('ROLE_ADMIN')) {
    
    this.serv.delete(id).subscribe((data)=>{
      console.log(data);
    });
    const index = this.listdemande.findIndex(item => item.id === id);
    if (index !== -1) {
      // Remove the item from the list
      this.listdemande.splice(index, 1);
    }
  }else {
    alert('Permission Deneied ! ')
  }

}


}
