import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Institut } from '../model/institut.model';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ServicesComponent } from '../services/services.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InstitutService } from '../services/institut.Service';

@Component({
  selector: 'app-add-etudiant',
  imports: [CommonModule,FormsModule,ReactiveFormsModule], // <-- Add this

  templateUrl: './add-etudiant.component.html',
  styleUrl: './add-etudiant.component.css'
})
export class AddEtudiantComponent implements OnInit {
  newEtudiant =new Etudiant();
  institut! : Institut[];
  newNom! : string;
  newInstitut! : Institut;
  myForm! :FormGroup;
  newIdI! :number;


  constructor(private serviceComponent :ServicesComponent,private router:Router,private formBuilder :FormBuilder,private institutService: InstitutService){

  }

  ngOnInit(): void {
    // Appel au service pour récupérer la liste des instituts
    this.institutService.listeInstituts().subscribe(
      (instituts: Institut[]) => {
        this.institut = instituts;  // Affectation à la variable
        console.log(this.institut);  // Affichage dans la console pour débogage
      },
      (error) => {
        console.error('Erreur lors de la récupération des instituts', error);
      }
    );
  
   


  

    this.myForm = this.formBuilder.group({
      id:['',[Validators.required,]],

      nom : ['', [Validators.required,Validators.minLength(3)]],
      prenom :['', [Validators.required, Validators.minLength(3)]],
      cin :['', [Validators.required, this.cinLengthValidator()]],
      dateNaissance :['', [Validators.required]],
      classe :['', [Validators.required]],
      institut :['', [Validators.required]],

      email : ['', [Validators.required, Validators.email]],
      } );
    
    }
  
    cinLengthValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value !== null && value !== undefined && value.toString().length !== 8) {
          return { 'cinLength': true }; // Retourne une erreur si la longueur n'est pas de 8
        }
        return null; // Pas d'erreur
      };
    }
    
  /*addEtudiant(){
    this.newInstitut =this.serviceComponent.consulterInstitut(this.newNom);
    this.newEtudiant.institut = this.newInstitut;

    this.serviceComponent.ajouterEtudiant(this.newEtudiant);
    this.router.navigate(["etudiant"]);
    
    
  }*/
 addEtudiant(){
console.log("!!!!!!!!!!!!!!!!!",this.myForm.value.newIdI)
  this.newEtudiant.institut=this.institut.find(ins=>ins.idI==this.newIdI)!;
  this.serviceComponent.ajouterEtudiant(this.newEtudiant).subscribe(etud=> {console.log(etud);
    this.router.navigate(['/etudiant']);
  })
 }
 
}