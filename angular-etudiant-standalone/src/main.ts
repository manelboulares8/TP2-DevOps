import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
/*
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
*/
bootstrapApplication(AppComponent, {
  ...appConfig, // Conserve vos configurations existantes
  providers: [
    ...(appConfig.providers || []), // Garde les providers existants
    provideHttpClient() // Ajoute le HttpClient
  ]
}).catch((err) => console.error(err));