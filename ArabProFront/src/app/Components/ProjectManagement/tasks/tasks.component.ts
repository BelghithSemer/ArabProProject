import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginResponse } from 'src/app/models/loginResponse';
import { Project } from 'src/app/models/Project';
import { Task, TaskStatus } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/Services/project.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  projectId!: number;
  project: Project;

  tasks: Task[] = [];
  user !: LoginResponse // current user
  tasksTODO: Task[] = [];
  tasksInProgress: Task[] = [];
  tasksReview: Task[] = [];
  tasksDone: Task[] = [];
  // for adding new task 
  task : Task;
  taskForm!: FormGroup;
  edittaskForm: FormGroup;
  users: User[] = [];
  priorities: string[] = ['Inférieure', 'Moyenne', 'Élevée'];
  //statuses: TaskStatus[] = [TaskStatus.DONE,TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.TODO];
  getBadgeClass(priority: string): string {
    switch (priority) {
      case 'Inférieure':
        return 'bg-success'; // Green for lower priority
      case 'Moyenne':
        return 'bg-warning'; // Yellow for medium priority
      case 'Élevée':
        return 'bg-danger';  // Red for high priority
      default:
        return 'bg-secondary'; // Default color if no match
    }
  }
  
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private fb:FormBuilder,
    private us:UserService
  ) {
    this.project = {
      id : 0,
      etat: 'OnGoing',
      description :'nothing',
      manager : undefined,
      libelle : '',
      date : new Date()
    }
    this.taskForm = this.fb.group({
      priority: ['', Validators.required],
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      
      employee: [null, Validators.required]
    });
    this.edittaskForm = this.fb.group({
      priority: ['', Validators.required],
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      employee: ['', Validators.required]
    });
    this.task = {
      id:0,
      libelle:'',
      status:TaskStatus.TODO,
      employee: undefined,
      project:undefined,
      priority:'',
      description:'',
      date: new Date()

    }
  }

  ngOnInit(): void {
    // Extract the projectId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('id')!; 
      console.log(this.projectId);
      this.getProject();
    });
    this.loadUsers();
    // Getting Current User 
    this.user = {
      accessToken: sessionStorage.getItem('accessToken') || '',
      username: sessionStorage.getItem('username') || '',
      email: sessionStorage.getItem('email') || '',
      id: parseInt(sessionStorage.getItem('id') || '') || 0,
      roles: JSON.parse(sessionStorage.getItem('roles') || '[]'),
      tokenType: sessionStorage.getItem('tokenType') || '',
    };
  
    
  }

  getProject(): void {
    // Fetch the project details using the projectId
    this.projectService.GetProject(this.projectId).subscribe(
      (data) => {
        this.project = data;
        console.log('Project details:', data);
        //getting tasks list : 
        this.projectService.GetAllTasks().subscribe((data)=>{
          this.tasks = data.filter(task => task.project?.id === this.project.id);
          console.log('Tasks : ',this.tasks);
          this.tasksTODO = this.tasks.filter(task => task.status === TaskStatus.TODO);
          this.tasksInProgress = this.tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
          this.tasksReview = this.tasks.filter(task => task.status === TaskStatus.REVIEW);
          this.tasksDone = this.tasks.filter(task => task.status === TaskStatus.DONE);
        });
      }
    );
  }
  loadUsers() {
    this.us.GetUsers().subscribe((data) => {
      // Filter users to only keep those with the 'ROLE_CHEF' role
      this.users = data;
      console.log('users',this.users);
      this.users = data.filter(user => 
        user.roles.some(role => role.name === 'ROLE_EMPLOYEE')
      );
    });
  }
  onSubmit(){
    this.task.description =  this.taskForm.value.description;
    this.task.libelle = this.taskForm.value.libelle;
    this.task.employee = this.taskForm.value.employee;
    this.task.priority = this.taskForm.value.priority;
    this.task.project = this.project;
    this.task.status = TaskStatus.NEW;
    //console.log(this.task);
    this.projectService.AddTask(this.task).subscribe((data)=>{
      console.log(data);
    })


  }
  ChangeStatus(t: Task, status: string){
    if(status === 'progress'){
      t.status = TaskStatus.IN_PROGRESS;
      
    }else if(status === 'done'){
      t.status = TaskStatus.DONE
    }else if(status === 'review'){
      t.status = TaskStatus.REVIEW
    }else{
      t.status = TaskStatus.TODO
    }


    this.projectService.updateTask(t).subscribe((data)=>{
      console.log(data);
      this.getProject();
    });
  }


  // Call this method when opening the update modal
  openUpdateModal(task : Task) {
    this.task = task;
    this.edittaskForm.patchValue({
      priority: task.priority,
      libelle: task.libelle,
      description: task.description,
      employee: task.employee
    });
  }


  onUpdate() {
    if (this.edittaskForm.valid) {
      this.task.description =  this.edittaskForm.value.description;
      this.task.libelle = this.edittaskForm.value.libelle;
      this.task.employee = this.edittaskForm.value.employee;
      this.task.priority = this.edittaskForm.value.priority;
      this.task.project = this.project;

      this.projectService.updateTask(this.task).subscribe((data)=>{
        console.log(data);
      })
    }
  }


  // Check if the user has 'ROLE_ADMIN' or 'ROLE_CHEF'
  isAdminOrChef(): boolean {
    return this.user.roles.includes('ROLE_ADMIN') || this.user.username === this.project.manager?.username;
  }

  // Check if the user has 'ROLE_EMPLOYEE'
  isEmployee(): boolean {
    return this.user.roles.includes('ROLE_EMPLOYEE');
  }
}
