import { Project } from "./Project";
import { User } from "./User";

export class Task{
    id!:number;
    priority!:string;
    libelle!:string;
    description!:string;
    status!:TaskStatus;


    employee: User | undefined;

    project: Project | undefined;
}
export enum TaskStatus{
    TODO ='TODO', IN_PROGRESS = 'IN_PROGRESS', REVIEW = 'REVIEW' ,DONE = 'DONE'
}