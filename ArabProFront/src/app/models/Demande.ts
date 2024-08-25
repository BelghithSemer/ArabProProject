export class Demande{
    id!: number;
  typeDemande!: string;
  description!: string;
  state!: DemandState;

  idDemandeur!: number;
  idChef!: number;
  idAdmin!: number;

  duree!:number;
  dateSortie!:Date;
  dateDebut!:Date;

  montantdemande!:number;

  dateCreation!: Date;
  dateValidationPartielle!: Date;
  dateValidationFinale!: Date;
}
export enum DemandState{
  SOUMISE = 'SOUMISE',
  PARTIELLEMENT_VALIDEE = 'PARTIELLEMENT_VALIDEE',
  VALIDEE = 'VALIDEE',
  REFUSEE = 'REFUSEE',
}