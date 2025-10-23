import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,RouterLink,        // Ajouté
    RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Etudiant';
  token!:string;
    private helper = new JwtHelperService();
  constructor(public authService :AuthService, private router :Router){}
  onLogout(){
    this.authService.logout(); 
  }
  /*ngOnInit () { 
    let isloggedin: string; 
    let loggedUser:string; 
    if (typeof localStorage !== 'undefined') {

      isloggedin  = localStorage.getItem('isloggedIn')?? ''; 
      loggedUser = localStorage.getItem('loggedUser')?? '';
   }

    if (isloggedin !== "true" || !loggedUser) 
        this.router.navigate(['/login']); 
    else 
     this.authService.setLoggedUserFromLocalStorage(loggedUser); 
  } */
     ngOnInit () {
      this.authService.loadToken();
      if (this.authService.getToken()==null ||
       this.authService.isTokenExpired())
      this.router.navigate(['/login']);
      }
      
    }