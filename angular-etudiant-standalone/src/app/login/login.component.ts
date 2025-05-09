import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,HttpClientModule], // <-- Add this

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  user = new User();
  erreur = 0;
  err:number = 0;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Suppression de l'erreur lancée
  }
  /*onLoggedin(){ 
    console.log(this.user); 
    let isValidUser: Boolean = this.authService.SignIn(this.user); 
   
    if (isValidUser) 
       this.router.navigate(['etudiant']); 
    else 
       alert('Login ou mot de passe incorrecte!'); 
    } */
       onLoggedin()
{
this.authService.login(this.user).subscribe({
next: (data) => {
let jwToken = data.headers.get('Authorization')!;
this.authService.saveToken(jwToken);
this.router.navigate(['/etudiant']);
},
error: (err: any) => {
this.err = 1;
}
});
}
}
