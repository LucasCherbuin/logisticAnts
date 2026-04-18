import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from 'app/routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(Routes)
  ]
};
