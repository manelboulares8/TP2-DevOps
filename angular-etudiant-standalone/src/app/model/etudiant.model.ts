import { Institut } from "./institut.model";

export class Etudiant {
    id! :number;
    nom?: string;
    prenom? : string;
    cin? : number;
    dateNaissance?: Date ;
    classe? :string;
    institut? : Institut;
    email! :string;
    //enabled! : boolean;
    }
