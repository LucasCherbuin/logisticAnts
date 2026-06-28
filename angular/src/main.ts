import { AppComponent } from './app/component/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err: unknown) => console.error(err));

