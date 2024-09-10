import { Component } from '@angular/core';
import { Notif } from 'src/app/models/Notif';
import { Task, TaskStatus } from 'src/app/models/Task';
import { NotifService } from 'src/app/Services/notif.service';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-tasks-verification',
  templateUrl: './tasks-verification.component.html',
  styleUrls: ['./tasks-verification.component.css']
})
export class TasksVerificationComponent {

  tasks : Task[]  = []
  notif: Notif;
  constructor(private ps:ProjectService,private ns:NotifService){
    this.notif = {
      id:0,
      content:"",
      type:"",
      request: undefined,
      task:undefined,
      date: new Date()
    }
  }

  ngOnInit(){
    this.ps.GetAllTasks().subscribe((data)=>{
      this.tasks = data;
      const newTasks = this.tasks.filter(task => task.status === TaskStatus.NEW);
      this.tasks = newTasks;
      console.log(this.tasks);

      this.tasks.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime(); 
      });
      
    })
  }
  Repondre(task : Task, res:string){
    if(res === 'accept'){
      task.status = TaskStatus.TODO;
      this.ps.updateTask(task).subscribe((data)=>{
        console.log('UpdatedTask : ',data);
        const index = this.tasks.indexOf(task);
        if (index !== -1) {
          this.tasks.splice(index, 1); 
        }
        this.notif.type =  'Task';
        this.notif.content = 'Tache Attribué';
        this.notif.task =  task;
        this.ns.SendRequestNotif(this.notif).subscribe((data)=>{
          console.log('New Notif : ',data);
        });
      })
    }else{
    this.ps.deleteTask(task.id).subscribe((data)=>{
      console.log(data);
      const index = this.tasks.indexOf(task);
        if (index !== -1) {
          this.tasks.splice(index, 1); 
        }
    })
    }
  }
}
