import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { ServicesComponent } from '../services/services.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etudiant',
  imports: [CommonModule], // <-- Add this

  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent  implements OnInit {
  etudiant! :Etudiant[];
  constructor (private serviceComponent : ServicesComponent ,public authService: AuthService){
   // this.etudiant = serviceComponent.listeEtudiant();
  }
  /*ngOnInit(): void {
    this.serviceComponent.listeEtudiant().subscribe(prods => {
      console.log(prods);
      this.etudiant = prods;
      });
  }
  supprimerEtudiant(e :Etudiant){
    //console.log(e);
    let conf =confirm("vous etes sur ?");
    if (conf)
      this.serviceComponent.supprimerEtudiant(e);

  }
 
  }*/
  ngOnInit(): void {
    this.chargerEtudiant();
    }
    chargerEtudiant(){
    this.serviceComponent.listeEtudiant().subscribe(prods => {
    console.log(prods);
    this.etudiant = prods;
    console.log("etudiant!!!!!!!!!!",this.etudiant);
    });
    }
    
    supprimerEtudiant(p: Etudiant) {
      let conf = confirm("Etes-vous sûr ?");
      if (conf) {
        this.serviceComponent.supprimerEtudiant(p).subscribe({
          next: () => {
            console.log("Étudiant supprimé");
            this.chargerEtudiant(); // Recharge la liste des étudiants
          },
          error: (err) => {
            console.error("Erreur lors de la suppression de l'étudiant", err);
          }
        });
      }
    }
    
}

