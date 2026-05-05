<<<<<<< HEAD
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
<<<<<<< HEAD

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
=======
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
<<<<<<< HEAD
  .catch((err: unknown) => console.error(err));
>>>>>>> d429531 (correction fichier pour builds)
=======
=======
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/component/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
>>>>>>> login
  .catch((err: unknown) => console.error(err));
>>>>>>> 7b6f1f50 (merge login fix)
