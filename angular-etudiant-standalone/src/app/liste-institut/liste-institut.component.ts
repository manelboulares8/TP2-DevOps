import { Component, OnInit } from '@angular/core';
import { Institut } from '../model/institut.model';
import { ServicesComponent } from '../services/services.component';
import { InstitutWrapper } from '../model/institutWrapped.model';
import { InstitutService } from '../services/institut.Service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-institut',
  imports: [CommonModule], // <-- Add this

  templateUrl: './liste-institut.component.html',
  styleUrl: './liste-institut.component.css'
})
export class ListeInstitutComponent implements OnInit{
  public categorieUpdated!:any
 
 instituts!:Institut[];  // Liste des types
   updatedInstitut: Institut = { idI: 0, nomI: "",localisation:"",numTlf:0 };  // Type à mettre à jour
   ajout: boolean = true;  // Mode ajout ou modification
   currentId: number = 0;
 
   constructor(private institutService: InstitutService,private serviceComponent : ServicesComponent  )  { }
 
   ngOnInit(): void {
     /*this.serviceComponent.listeInstituts().subscribe(cats => {this.instituts= cats._embedded.instituts;
 console.log(cats);
 });*/
 this.serviceComponent.listeInstituts().subscribe(
  (wrapper: InstitutWrapper) => {
    console.log(wrapper); // Vérifie la structure de la réponse (doit contenir _embedded)
    
    // Extraire le tableau des instituts de _embedded
    this.instituts = wrapper._embedded.instituts;
    console.log(this.instituts); // Vérifie que le tableau est correctement extrait
  },
  (error) => {
    console.error('Erreur lors de la récupération des instituts', error); // Gestion des erreurs
  }
);
 }
   
 
   chargerInstituts() {
    /* this.institutService.listeInstituts().subscribe(instituts => {
       this.instituts = instituts;  // Remplir la liste des types avec les données du service
       console.log(this.instituts);  // Afficher dans la console pour vérification
       if (this.instituts.length > 0) {
         this.currentId = Math.max(...this.instituts.map(type => type.idI));
       }
     });*/
     this.serviceComponent.listeInstituts().
 subscribe(cats => {this.instituts = cats._embedded.instituts;
 console.log(cats);
 });
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
       institutUpdated(cat:Institut){
         console.log("Ins updated event",cat);
         this.serviceComponent.ajouterInstitut(cat).
          subscribe( ()=> this.chargerInstituts());
         }
 }
 