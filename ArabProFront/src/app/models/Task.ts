import { Project } from "./Project";
import { User } from "./User";

export class Task{
    id!:number;
    priority!:string;
    Libelle!:string;
    Description!:string;
    status!:TaskStatus;


    employee: User | undefined;

    project: Project | undefined;
}
export enum TaskStatus{
    TODO, IN_PROGRESS, REVIEW ,DONE
}