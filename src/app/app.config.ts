import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// provideHttpClient permite hacer peticiones HTTP
// withInterceptors registra el interceptor que agrega el token automaticamente

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     provideHttpClient(withInterceptors([authInterceptor]))
    // registra HttpClient con el interceptor de autenticacion
  ]
};
