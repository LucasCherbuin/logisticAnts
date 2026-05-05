<<<<<<< HEAD
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
=======
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/component/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
>>>>>>> login
  .catch((err: unknown) => console.error(err));