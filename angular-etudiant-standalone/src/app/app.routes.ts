import { Routes } from '@angular/router';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { AddEtudiantComponent } from './add-etudiant/add-etudiant.component';
import { UpdateEtudComponent } from './update-etud/update-etud.component';
import { RechercheParInstitutComponent } from './recherche-par-institut/recherche-par-institut.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeInstitutComponent } from './liste-institut/liste-institut.component';
import { UpdateInstitutComponent } from './update-institut/update-institut.component';
import { EtudiantGuard } from './etudiant.guard';

export const routes: Routes = [
    {path: "etudiant", component: EtudiantComponent},
  {path: "add-etudiant", component: AddEtudiantComponent, canActivate: [EtudiantGuard]},
  {path: "", redirectTo: "etudiant", pathMatch: "full"},
  {path: "updateEtud/:id", component: UpdateEtudComponent},
  {path: "recherche-par-institut", component: RechercheParInstitutComponent},
  {path: "recherche-par-nom", component: RechercheParNomComponent},
  {path: "login", component: LoginComponent},
  {path: "forbidden", component: ForbiddenComponent},
  {path: "app-forbidden", component: ForbiddenComponent},
  {path: "liste-institut", component: ListeInstitutComponent},
  {path: "update-institut", component: UpdateInstitutComponent}
];
