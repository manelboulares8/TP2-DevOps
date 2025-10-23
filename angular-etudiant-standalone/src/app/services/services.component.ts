import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Injectable } from '@angular/core';
import { Institut } from '../model/institut.model';
import { Observable } from 'rxjs';
import { InstitutWrapper } from '../model/institutWrapped.model';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import id from '@angular/common/locales/id';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
 providedIn: 'root', // Makes it available throughout the app
})

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  imports: [CommonModule,HttpClientModule], // <-- Add this

})



export class ServicesComponent implements OnInit{
  
  /*rechercherParInstitut(idI: number): Etudiant[] {
    const institut = this.institut.find(ins => ins.idI === idI);
  if (institut) {
    return this.etudiant.filter(etud => etud.institut?.nomI === institut.nomI);
  }
  // Si aucun institut ne correspond, retourner une liste vide
  return [];
  }*/
  apiURL: string = 'http://localhost:8082/etudiant2/api';
 /* rechercherParInstitut(idI: number): Etudiant[] {
    return this.etudiant.filter(e => e.institut?.idI === idI);
  }*/
  etudiant!:Etudiant[];
  etudiantt! : Etudiant;
  institut! : Institut[];
  apiURLIns: string = 'http://localhost:8082/etudiant2/api/ins';

  
  constructor(private http :HttpClient,private authService :AuthService) {
 /* this.institut = [ {idI :1,nomI:"ISET ",localisation :"Nabeul",numTlf:72345679},
    {idI :2,nomI:"INSAT",localisation :"Tunis",numTlf:71564200},
    {idI :3,nomI:"FSEG",localisation :"Nabeul",numTlf:72666987},
    {idI :4,nomI:"ISG",localisation :"Tunis",numTlf:71876533},
    {idI :5,nomI:"IHEC",localisation :"Carthage",numTlf:71113456},


  
                   ];*/
  
    /*this.etudiant= [
      { id :1,nom:"Boulares", prenom:"Manel", cin:14444444, dateNaissance: new Date("01/10/2004"), classe:"DSI 23" , institut :{idI:1,nomI :"ISETN" ,localisation :"Nabeul",numTlf:58678234},email :'boularesmanel@gmail.com'},
      {id :2, nom:"Jemai", prenom:"Ghofrane", cin:14444441, dateNaissance: new Date("11/11/2004"), classe:"DSI 22",institut :{idI:2,nomI :"ISETK" ,localisation :"Kelibia",numTlf:53444234},email :'jemaighofrane@gmail.com'},
      { id :3,nom:"Guelbi", prenom:"Farah", cin:14444442, dateNaissance: new Date("06/03/2004"), classe:"MDW 21",institut :{idI:3,nomI :"ISETR" ,localisation :"Rades",numTlf:98345222},email :"guelbifarah@gmail.com"},
  
       ];*/
      
  }
  ngOnInit(): void {
 
  }
  listeEtudiant():Observable<Etudiant[]> {
    let jwt = this.authService.getToken();
//jwt = "Bearer "+jwt;
let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Etudiant[]>(this.apiURL+"/all",{headers:httpHeaders});

  }
  /*ajouterEtudiant (etud : Etudiant){
    this.etudiant.push(etud);
  }*/
 ajouterEtudiant(etud :Etudiant):Observable<Etudiant>{
  let jwt = this.authService.getToken();
//  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.post<Etudiant>(this.apiURL+"/addetud",etud,{headers:httpHeaders});
 }
  //supprimerEtudiant(e :Etudiant){
    //supprimer le Etudiant prod du tableau Etudiants
    /*const index = this.etudiant.indexOf(e, 0);
    if (index > -1) {
    this.etudiant.splice(index, 1);
    }*/
    //ou Bien
    /* this.Etudiants.forEach((cur, index) => {
    if(prod.idIEtudiant === cur.idIEtudiant) {
    this.Etudiants.splice(index, 1);
    }
    }); */
    //}
   supprimerEtudiant(e: Etudiant): Observable<any> {
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });
  
  // Assurez-vous que l'ID de l'étudiant est valide
  if (!e || !e.id) {
    console.error("ID de l'étudiant invalide");
    return new Observable(); // Retourne une Observable vide en cas d'erreur
  }

  const url = `http://localhost:8082/etudiant2/api/deleteetud/${e.id}`; // Utilise l'ID de l'étudiant
  const httpOptions = { headers: httpHeaders }; // Ajoute les headers aux options HTTP

  return this.http.delete(url, httpOptions); // Envoie la requête DELETE avec les options
}

  
  /*consulterEtud(cin:number):Etudiant{
    return   this.etudiantt = this.etudiant.find(e => e.cin == cin)!;
   
    }*/
   consulterEtud(id :number):Observable<Etudiant>{
     let jwt = this.authService.getToken();
        let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    const url=`http://localhost:8082/etudiant2/api/getbyid/${id}`;
    return this.http.get<Etudiant>(url, { headers: httpHeaders });
   }
    trierEtudiants(){
      this.etudiant = this.etudiant.sort((n1,n2) => {
      if (n1.id! > n2.id!) {
      return 1;
      }
      if (n1.id! < n2.id!) {
      return -1;
      }
      return 0;
      });
      }
   /* updateEtudiant(e :Etudiant){
      this.supprimerEtudiant(e);
      this.ajouterEtudiant(e);
      this.trierEtudiants();
    }*/
      updateEtudiant(prod :Etudiant) : Observable<Etudiant>
      {
      //return this.http.put<Etudiant>(this.apiURL, prod, httpOptions);
    //  const url = `${this.apiURL}/${prod.id}`; // Inclut l'ID dans l'URL
     let jwt = this.authService.getToken();
        let httpHeaders = new HttpHeaders({ "Authorization": jwt });
  return this.http.put<Etudiant>('http://localhost:8082/etudiant2/api/updateetud', prod,  { headers: httpHeaders });
      }


      /*listeInstituts():Institut[] {
      return this.institut;
      }*/
  

      listeInstituts(): Observable<InstitutWrapper> {
       
        return this.http.get<InstitutWrapper>(this.apiURLIns + "/allIns");
      }
      
     /* listeInstituts():Observable<Institut[]>{
        return this.http.get<Institut[]>(this.apiURL+"/ins");

      }
*/

     
      consulterInstitut(id :number): Institut{
        return this.institut.find(ins => ins.idI== id)!;
        }
       /* consulterInstitut(id: number): Observable<Institut> {
          return this.http.get<Institut>(`${this.apiURLIns}/${id}`);
        }*/
        




        /*ajouterInstitut(institut : Institut): Observable<Institut> {
          // Ajoute le type au tableau local
          this.institut.push(institut);
          return new Observable(observer => {
            observer.next(institut); // Envoie le type ajouté
            observer.complete();  // Terminer l'Observable
          });
        }*/
       
          ajouterInstitut(cat: Institut):Observable<Institut>{
            
            return this.http.post<Institut>(this.apiURLIns, cat, httpOptions);
            }

            rechercherParNom(nom: string):Observable< Etudiant[]> {
                let jwt = this.authService.getToken();
        let httpHeaders = new HttpHeaders({ "Authorization": jwt });
              const url = `${this.apiURL}/etud/${nom}`;
              return this.http.get<Etudiant[]>(url,{ headers: httpHeaders });
              }

              rechercherParInstitut(idI: number):Observable<Etudiant[]> {
                 let jwt = this.authService.getToken();
        let httpHeaders = new HttpHeaders({ "Authorization": jwt });
                const url = `${this.apiURL}/etudsIns/${idI}`;
                return this.http.get<Etudiant[]>(url,{ headers: httpHeaders });
                }
              
}