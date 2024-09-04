import { ChangeDetectorRef, Component } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { Task, TaskStatus } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/Services/project.service';
import { UserService } from 'src/app/Services/user.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Demande, DemandState } from 'src/app/models/Demande';
import { DemandeService } from 'src/app/Services/demande.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
users : User[] = [];
projects : Project[] = [];
tasks : Task[] = [];
requests: Demande[] = [];
timeout:any = null;
  chart: any;
constructor(private us:UserService, private ps:ProjectService ,private cdr: ChangeDetectorRef, private ds:DemandeService){
  this.initializeChartOptions();
}

initializeChartOptions() {
  this.chartOptions = {
    animationEnabled: true,
    title: {
      text: ""
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: [
        { y: this.GetCompletedTasks(), name: "Terminé" },
        { y: this.GetBehindTasks(), name: "A Faire" },
        { y: this.GetInProgressTasks(), name: "En Cours" },
      ]
    }]
  };
}
ngOnInit(){
  this.us.GetUsers().subscribe((data)=>{
    this.users = data;
  });
  this.ps.GetAll().subscribe((data)=>{
    this.projects = data;
  });
  this.ps.GetAllTasks().subscribe((data)=>{
    this.tasks = data;
    this.updateChart();
  });
  this.ds.getAll().subscribe((data)=>{
    this.requests = data;
  })
}


GetProductivity(): number {
  // Filter tasks with status DONE and return the count
  return (this.tasks.filter(task => task.status === TaskStatus.DONE).length / this.tasks.length )*100 ;
}

GetCompletedTasks() : number{
  return (this.tasks.filter(task => task.status === TaskStatus.DONE).length / this.tasks.length )*100 ;
}
GetBehindTasks() : number{
  return (this.tasks.filter(task => task.status === TaskStatus.TODO).length / this.tasks.length )*100 ;
}
GetInProgressTasks() : number{
  return 100 - (this.GetCompletedTasks() + this.GetBehindTasks() );
}


updateChart() {
  this.chartOptions.data[0].dataPoints = [
    { y: this.GetCompletedTasks(), name: "Terminé" },
    { y: this.GetBehindTasks(), name: "A Faire" },
    { y: this.GetInProgressTasks(), name: "En Cours" },
  ];
  
  // Trigger change detection
  this.cdr.detectChanges();
}

chartOptions = {
  animationEnabled: true,
  title:{
  text: ""
  },
  data: [{
  type: "doughnut",
  yValueFormatString: "#,###.##'%'",
  indexLabel: "{name}",
  dataPoints: [
    { y: this.GetCompletedTasks(), name: "Terminé" },
    { y: this.GetBehindTasks(), name: "A Faire" },
    { y: this.GetInProgressTasks(), name: "En Cours" },
    
  ]
  }]
}




RequestchartOptions = {
  title: {
    text: "Demandes ",
    fontFamily: "Trebuchet MS, Helvetica, sans-serif"
  },
  axisY: {
    title: "Nombre",
    includeZero: true,
    suffix: " "
  },
  data: [{
    type: "column",	
    yValueFormatString: "#,### ",
    indexLabel: "{y}",
    dataPoints: [
      { label: "Non Traité", y: 206 },
      { label: "Accepté", y: 163 },
      { label: "Refusé", y: 154 },
      { label: "En Cours", y: 176 }
      
    ]
  }]
}

getChartInstance(chart: object) {
  this.chart = chart;
  this.updateRequestChart();
}

ngOnDestroy() {
  clearTimeout(this.timeout);
}

updateRequestChart = () => {
  // Filtering tasks based on their status
  const nonTreatedCount = this.requests.filter(task => task.state === DemandState.SOUMISE ).length;
  const acceptedCount = this.requests.filter(task => task.state === DemandState.VALIDEE).length;
  const refusedCount = this.requests.filter(task => task.state === DemandState.REFUSEE).length;
  const inProgressCount = this.requests.filter(task => task.state === DemandState.PARTIELLEMENT_VALIDEE ).length;

  // Update the chart's data points with the filtered task counts
  this.chart.options.data[0].dataPoints = [
    { label: "Non Traité", y: nonTreatedCount },
    { label: "Accepté", y: acceptedCount },
    { label: "Refusé", y: refusedCount },
    { label: "En Cours", y: inProgressCount }
  ];

  // Render the chart with updated data
  this.chart.render();

  // Optionally, update the chart periodically if needed
  this.timeout = setTimeout(this.updateRequestChart, 1000);
};


}
