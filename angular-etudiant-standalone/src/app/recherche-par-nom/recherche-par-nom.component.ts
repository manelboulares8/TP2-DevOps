import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServicesComponent } from '../services/services.component';
@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrl: './recherche-par-nom.component.css'
})
export class RechercheParNomComponent implements OnInit {
  allEtudiants! : Etudiant[];
  searchTerm!: string;
  etudiant! :Etudiant[];
  nom!: string;
  constructor(private serviceComponent : ServicesComponent){

  }
  ngOnInit(): void {
  /*   this.serviceComponent.listeEtudiant().subscribe(etu => {
      console.log(etu);
      this.allEtudiants = etu;
      });
      */
    //  this.etudiant=this.serviceComponent.listeEtudiant() ;
      this.allEtudiants=this.etudiant;
  }
 
  onKeyUp(filterText : string){
    this.etudiant = this.allEtudiants.filter(item =>item.nom!.toLowerCase().includes(filterText.toLowerCase()));
  
    
}
rechercherEtud(){
  this.serviceComponent.rechercherParNom(this.nom).
  subscribe(prods => {
  this.etudiant = prods;
  console.log(prods)});
  }
}