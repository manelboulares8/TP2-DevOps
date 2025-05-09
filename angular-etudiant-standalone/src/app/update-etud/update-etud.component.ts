/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesComponent } from '../services/services.component';
import { Etudiant } from '../model/etudiant.model';
import { Institut } from '../model/institut.model';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-update-etud',
  templateUrl: './update-etud.component.html',
  styleUrl: './update-etud.component.css'
})
export class UpdateEtudComponent implements OnInit{
  currentEtudiant =new Etudiant();
  institut! :Institut[];
  updatedNomI!:string;
  myForm! :FormGroup;
  constructor (private activatedRoute: ActivatedRoute,
    private router:Router,
    private servicesComponent: ServicesComponent,private formBuilder :FormBuilder
  ){

  }
  ngOnInit(): void {
    //console.log(this.activatedRoute);

    this.institut =this.servicesComponent.listeInstituts();
    this.currentEtudiant = this.servicesComponent.consulterEtud(this.activatedRoute.snapshot.params['id']);
    //this.updatedNomI!=this.currentEtudiant.institut?.nomI;
    console.log(this.currentEtudiant);
    if (this.currentEtudiant.institut && this.currentEtudiant.institut.nomI) {
      this.updatedNomI = this.currentEtudiant.institut.nomI;
    } else {
      this.updatedNomI = '';  // Utilisez une chaîne vide par défaut
    }
    this.myForm = this.formBuilder.group({

      id :['',[Validators.required]],

      nom : ['', [Validators.required,Validators.minLength(3)]],
      prenom :['', [Validators.required,Validators.minLength(3)]],
      cin :['', [Validators.required,  this.cinLengthValidator()]],
      dateNaissance :['', [Validators.required]],
      classe :['', [Validators.required]],
      institut :['', [Validators.required]],

      email : ['', [Validators.required, Validators.email]],
      } );
    //  this.updatedNomI = this.currentEtudiant.institut?.nomI;

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
updateEtud(){
  this.currentEtudiant.institut=this.servicesComponent.consulterInstitut(this.updatedNomI);
 //console.log(this.currentEtudiant);
 this.servicesComponent.updateEtudiant(this.currentEtudiant);
 this.router.navigate(["etudiant"]);
}


}
  


 */
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Etudiant } from '../model/etudiant.model';
import { Institut } from '../model/institut.model';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { InstitutWrapper } from '../model/institutWrapped.model';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-update-etud',
  templateUrl: './update-etud.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
  ],
  styleUrl: './update-etud.component.css'
})
export class UpdateEtudComponent implements OnInit{
  currentEtudiant =new Etudiant();
  institut! :Institut[];
  updatedInsI!:any;
  myForm! :FormGroup;
  newEtudiant =new Etudiant();
  constructor (private activatedRoute: ActivatedRoute,
    private router:Router,
    private servicesComponent: ServicesComponent,private formBuilder :FormBuilder
  ){

  }
  /*ngOnInit(): void {

    this.institut =this.servicesComponent.listeInstituts();
    this.currentEtudiant = this.servicesComponent.consulterEtud(this.activatedRoute.snapshot. params['id']);
    //this.updatedNomI!=this.currentEtudiant.institut?.nomI;
    console.log(this.currentEtudiant);
    if (this.currentEtudiant.institut && this.currentEtudiant.institut.nomI) {
      this.updatedNomI = this.currentEtudiant.institut.nomI;
    } else {
      this.updatedNomI = '';  // Utilisez une chaîne vide par défaut
    }
    this.myForm = this.formBuilder.group({
      //id :['',[Validators.required]],

      nom : ['', [Validators.required,Validators.minLength(3)]],
      prenom :['', [Validators.required,Validators.minLength(3)]],
      cin :['', [Validators.required,  this.cinLengthValidator()]],
      dateNaissance :['', [Validators.required]],
      classe :['', [Validators.required]],
      institut :['', [Validators.required]],

      email : ['', [Validators.required, Validators.email]],
      } );
    //  this.updatedNomI = this.currentEtudiant.institut?.nomI;

}*/
/*ngOnInit(): void {

  //this.institut =this.servicesComponent.listeInstituts();
  this.servicesComponent.listeInstituts().subscribe(ins => {this.institut=ins._embedded.instituts;
    console.log(ins);
});


    this.currentEtudiant = this.servicesComponent.consulterEtud(this.activatedRoute.snapshot. params['id']);
    //this.updatedNomI!=this.currentEtudiant.institut?.nomI;
    console.log(this.currentEtudiant);
    if (this.currentEtudiant.institut && this.currentEtudiant.institut.nomI) {
      this.updatedNomI = this.currentEtudiant.institut.nomI;
    } else {
      this.updatedNomI = '';  // Utilisez une chaîne vide par défaut
    }
    this.myForm = this.formBuilder.group({
      nom: [this.currentEtudiant.nom, [Validators.required, Validators.minLength(3)]],
      prenom: [this.currentEtudiant.prenom, [Validators.required, Validators.minLength(3)]],
      cin: [this.currentEtudiant.cin, [Validators.required, this.cinLengthValidator()]],
      dateNaissance: [this.currentEtudiant.dateNaissance ? this.currentEtudiant.dateNaissance.toISOString().split('T')[0] : '', [Validators.required]],
      classe: [this.currentEtudiant.classe, [Validators.required]],
      institut: [this.currentEtudiant.institut?.nomI, [Validators.required]],
      email: [this.currentEtudiant.email, [Validators.required, Validators.email]]
    });
    this.updatedNomI = this.currentEtudiant.institut?.nomI || '';

    
}*/

ngOnInit():void {
 /* const etudiantId = this.activatedRoute.snapshot.params['id'];

  this.servicesComponent.consulterEtud(this.activatedRoute.snapshot.params['id']).
   subscribe( prod =>{ this.currentEtudiant = prod; } ) ;

   this.myForm = this.formBuilder.group({
    id: [this.currentEtudiant.id, [Validators.required]],
    nom: [this.currentEtudiant.nom, [Validators.required, Validators.minLength(3)]],
    prenom: [this.currentEtudiant.prenom, [Validators.required, Validators.minLength(3)]],
    cin: [this.currentEtudiant.cin, [Validators.required, this.cinLengthValidator()]],
    dateNaissance: [this.currentEtudiant.dateNaissance ? this.currentEtudiant.dateNaissance.toISOString().split('T')[0] : '', [Validators.required]],
    classe: [this.currentEtudiant.classe, [Validators.required]],
    institut: [this.currentEtudiant.institut?.nomI, [Validators.required]],
    email: [this.currentEtudiant.email, [Validators.required, Validators.email]]
  });

  this.servicesComponent.listeInstituts().subscribe(ins => {
    this.institut = ins._embedded.instituts;
    this.updatedNomI = this.currentEtudiant.institut?.nomI || '';

  });*/

/*this.servicesComponent.listeInstituts().
    subscribe(cats => {this.institut = cats;
    console.log(cats);
    });


    this.servicesComponent.consulterInstitut(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentEtudiant = prod; 
      this.updatedInsI =   this.currentEtudiant.institut?.idI;
    
    } ) ;
  }
*/



//hedheya hoowa eli badaltou ekkhr haja kbal la njarab code pharmaplus: 
/*this.servicesComponent.listeInstituts().subscribe((response: InstitutWrapper) => {
  // Accéder au tableau d'instituts dans _embedded
  this.institut = response._embedded.instituts;  // Assurez-vous que `instituts` est bien un tableau d'Institut[]
  console.log(this.institut);  // Affichez le tableau pour vérifier
});

this.servicesComponent.consulterEtud(this.activatedRoute.snapshot.params['id']).subscribe((prod : Etudiant) => {
  this.currentEtudiant = prod;
  this.updatedInsI = this.currentEtudiant.institut?.idI;
});*/


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
 // Récupérer l'ID de la route
    //this.newEtudiant = this.EtunewEtudiantService.consulterEtunewEtudiant(id); // Remplir `newEtudiant` avec les données récupérées
    this.servicesComponent.consulterEtud(this.activatedRoute.snapshot.params['id'] ).subscribe(
      etudiant => {
        this.currentEtudiant = etudiant;
        this.updatedInsI=this.currentEtudiant.institut?.idI;
       console.log('!!!!!!!!!!!!!mmmmmm!!!!',this.currentEtudiant);
       console.log('!!!!!!!!!!!!!mmmmmm!!!!',this.updatedInsI);

       
      } )
      this.servicesComponent.listeInstituts().subscribe(ins => {
        // Vous accédez à l'array des instituts dans la réponse
        this.institut = ins._embedded.instituts;
        console.log("institut",this.institut); // Afficher la liste dans la console pour déboguer
      });
    }// Remplir `newEtudiant` avec les données récupérées
      
  
   
   // this.myForm.patchValue(this.newEtudiant);


cinLengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value !== null && value !== undefined && value.toString().length !== 8) {
      return { 'cinLength': true }; // Retourne une erreur si la longueur n'est pas de 8
    }
    return null; // Pas d'erreur
  };
}
/*updateEtud(){
  this.currentEtudiant.institut=this.servicesComponent.consulterInstitut(this.updatedNomI);
 //console.log(this.currentEtudiant);
 this.servicesComponent.updateEtudiant(this.currentEtudiant);
 this.router.navigate(["etudiant"]);
}*/
/*updateEtud(){
  const updatedData = this.myForm.value;

this.currentEtudiant.nom = updatedData.nom;
this.currentEtudiant.prenom = updatedData.prenom;
this.currentEtudiant.cin = updatedData.cin;
this.currentEtudiant.dateNaissance = new Date(updatedData.dateNaissance);
this.currentEtudiant.classe = updatedData.classe;
this.currentEtudiant.email = updatedData.email;
this.currentEtudiant.institut = this.servicesComponent.consulterInstitut(updatedData.institut);

this.servicesComponent.updateEtudiant(this.currentEtudiant);
this.router.navigate(["etudiant"]);

}*/
updateEtud(){


  
 this.currentEtudiant.institut=this.institut.find(ins=>ins.idI==this.updatedInsI)!;
 this.servicesComponent.updateEtudiant(this.currentEtudiant).subscribe(etudiant=>{
  this.router.navigate(['etudiant']);}
 );

 

}
}

  

