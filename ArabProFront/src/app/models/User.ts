export interface Role {
    id: number;
    name: string;
  }
  
  export class User {
    id!: number; // Optional as it may not be required when creating a new user
    username!: string;
    email!: string;
    password!: string; // Note: In a real application, password should not be included in responses for security reasons
    roles!: Role[];
    matricule!: number;
    nom!: string;
    prenom!: string;
    tel!: string;
    poste!: string;
    sexe!: string;
    dateNaissance!: string; // Use ISO 8601 format for dates (e.g., "YYYY-MM-DD")
    lieuNaissance!: string;
    experience!: string;
    dateEmbauche!: string; // Use ISO 8601 format for dates (e.g., "YYYY-MM-DD")
    soldeConge!: string;
    idDep!: number;
  }
  