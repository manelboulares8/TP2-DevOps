import { Component, Injectable, OnInit } from '@angular/core';
import { Institut } from '../model/institut.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root', // Fournisseur global
})




export class InstitutService  {
    private instituts :Institut[] =[
        {idI :1,nomI:"ISET ",localisation :"Nabeul",numTlf:72345679},
        {idI :2,nomI:"INSAT",localisation :"Tunis",numTlf:71564200},
        {idI :3,nomI:"FSEG",localisation :"Nabeul",numTlf:72666987},
        {idI :4,nomI:"ISG",localisation :"Tunis",numTlf:71876533},
        {idI :5,nomI:"IHEC",localisation :"Carthage",numTlf:71113456},





        
    ];
    constructor(private authService:AuthService,private http :HttpClient){}
    apiURL: string = 'http://localhost:8082/etudiant2/api/ins';

listeInstituts(): Observable<Institut[]> {
    const jwt = this.authService.getToken(); // Obtenir le token d'authentification
    const httpHeaders = new HttpHeaders({ 'Authorization': jwt });

    return this.http.get<Institut[]>(`${this.apiURL}/allIns`, { headers: httpHeaders });
  }
private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization':  token });
  }

  ajouterInstitut(institut: Institut): Observable<Institut> {
      const jwt = this.authService.getToken(); // Obtenir le token d'authentification
    const httpHeaders = new HttpHeaders({ 'Authorization': jwt });
    console.log("m hereeeeeeeeeeeeee")
    return this.http.post<Institut>(`http://localhost:8082/etudiant2/api/ins/addInstitut`, institut, {headers:httpHeaders });
  }

  supprimerInstitut(id: number): Observable<void> {
       const jwt = this.authService.getToken(); // Obtenir le token d'authentification
    const httpHeaders = new HttpHeaders({ 'Authorization': jwt });
    return this.http.delete<void>(`${this.apiURL}/${id}`,{headers:httpHeaders });
  }
  updateInstitut(institut: Institut): Observable<Institut> {
      const jwt = this.authService.getToken(); // Obtenir le token d'authentification
    const httpHeaders = new HttpHeaders({ 'Authorization': jwt });
  const url = `${this.apiURL}/${institut.idI}`;
  return this.http.put<Institut>(`http://localhost:8082/etudiant2/api/ins`, institut, {headers:httpHeaders });
}
}