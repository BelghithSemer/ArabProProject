import { User } from "./User";

export class Project{
    id!:number;
    description!:string;

    libelle!:string;

    etat!:string;
    date!:Date;
    manager:User |undefined;
}