import { Demande } from "./Demande";
import { Task } from "./Task";

export class Notif {

    id!:number;
    content!:string;
    type!:string;
    request:Demande | undefined;

    task:Task |undefined;
    date!:Date;

}