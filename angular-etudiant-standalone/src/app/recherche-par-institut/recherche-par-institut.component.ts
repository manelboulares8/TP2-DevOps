import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Institut } from '../model/institut.model';
import { tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServicesComponent } from '../services/services.component';
import { InstitutService } from '../services/institut.Service';

@Component({
  selector: 'app-recherche-par-institut',
  templateUrl: './recherche-par-institut.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
  //styleUrl:'./recherche-par-institut.component.css'
})
export class RechercheParInstitutComponent implements OnInit {
  etudiant! :Etudiant[];
  instituts! :Institut[];
  nomInstitut! :String;
  idI! :number;
  constructor(private serviceComponent : ServicesComponent, private institutService:InstitutService){
  
  }
  ngOnInit(): void {
    
   // this.etudiant=this.serviceComponent.listeEtudiant();

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
    onChange() {
      this.serviceComponent.rechercherParInstitut(this.idI).
      subscribe(prods =>{this.etudiant=prods});
      }
  }
 /* onChange(){
    console.log(this.nomInstitut);
    const selectedIdI = Number(this.idI);
    console.log('ID sélectionné après conversion:', selectedIdI);
    
    this.etudiant=this.serviceComponent.rechercherParInstitut(selectedIdI);
    console.log('Étudiants après filtrage:', this.etudiant);

  }*/


 

