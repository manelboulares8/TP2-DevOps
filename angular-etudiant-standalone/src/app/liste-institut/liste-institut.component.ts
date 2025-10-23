import { Component, OnInit } from '@angular/core';
import { Institut } from '../model/institut.model';
import { InstitutService } from '../services/institut.Service';
import { CommonModule } from '@angular/common';
import { UpdateInstitutComponent } from '../update-institut/update-institut.component';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-liste-institut',
  templateUrl: './liste-institut.component.html',
  styleUrls: ['./liste-institut.component.css'],
  imports: [CommonModule,UpdateInstitutComponent], 
})
export class ListeInstitutComponent implements OnInit {
  instituts!: Institut[]; // Liste des instituts récupérés

  constructor(private institutService: InstitutService,private serviceComponent : ServicesComponent ) {}
  public categorieUpdated!:any
 
   updatedInstitut: Institut = { idI: 0, nomI: "",localisation:"",numTlf:0 };  // Type à mettre à jour
   ajout: boolean = true;  // Mode ajout ou modification
   currentId: number = 0;
  ngOnInit(): void {
    // Appel au service pour récupérer la liste des instituts
    this.institutService.listeInstituts().subscribe(
      (instituts: Institut[]) => {
        this.instituts = instituts;  // Affectation à la variable
        console.log(this.instituts);  // Affichage dans la console pour débogage
      },
      (error) => {
        console.error('Erreur lors de la récupération des instituts', error);
      }
    );
  }
   chargerInstituts() {
  this.institutService.listeInstituts().subscribe(
    (instituts: Institut[]) => {
      this.instituts = instituts;
      console.log(this.instituts);
      if (this.instituts.length > 0) {
        this.currentId = Math.max(...this.instituts.map(i => i.idI!));
      }
    },
    (error) => {
      console.error("Erreur lors du chargement des instituts :", error);
    }
  );
}

 
   updateInstitut(institut: Institut) {
   /*  this.updatedInstitut = { ...institut };  // Copier les données du type à modifier
     this.ajout = false;  */// Passer en mode modification
     this.updatedInstitut=institut;
     this.ajout=false;
 
   }
 
  
 
  /* InstitutUpdated(institut :Institut) {
     console.log("Type updated event", institut);
    
       if (this.ajout) {
         this.currentId++;  // Incrémenter l'ID
         institut.idI = this.currentId;  // Assigner l'ID au type ajouté
         this.instituts.push({ ...institut });
       } else {
         // Sinon, mettre à jour le type existant
         const index = this.instituts.findIndex(t => t.idI === institut.idI);
         if (index !== -1) {
           this.instituts[index] = { ...institut };  // Remplacer le type modifié
         }
       }
   }*/
       institutUpdated(cat: Institut) {
  console.log("Ins updated event", cat);
  
  if (this.ajout) {
    // Mode ajout => POST
    this.institutService.ajouterInstitut({
      ...cat,
      idI: undefined // éviter d'envoyer l'ID au backend
    }).subscribe(() => {
      this.chargerInstituts();
    });
  } else {
    // Mode modification => PUT
    this.institutService.updateInstitut(cat).subscribe(() => {
      this.chargerInstituts();
      this.ajout = true; // repasser en mode ajout
      this.updatedInstitut = { idI: 0, nomI: "", localisation: "", numTlf: 0 };
    });
  }
}


   supprimerInstitut(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet institut ?')) {
      this.institutService.supprimerInstitut(id).subscribe(() => {
        this.instituts = this.instituts.filter(institut => institut.idI !== id);  // Supprimer de la liste
      });
    }
  }  
  modifierInstitut(institut: Institut): void {
  this.institutService.updateInstitut(institut).subscribe(() => {
    this.chargerInstituts(); // Recharge la liste après la mise à jour
    this.ajout = true; // Revenir au mode "ajout"
    this.updatedInstitut = { idI: 0, nomI: "", localisation: "", numTlf: 0 }; // Réinitialiser le formulaire
  });
}

}
