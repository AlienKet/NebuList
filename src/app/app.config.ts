//aqui se configura la aplicacion, se registran los proveedores de servicios globales, 
// como el enrutador y el cliente HTTP con sus interceptores.
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// provideHttpClient permite hacer peticiones HTTP
// withInterceptors registra el interceptor que agrega el token automaticamente

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {// se exporta la configuracion de la aplicacion
  providers: [
    provideBrowserGlobalErrorListeners(),// registra un manejador global de errores para la aplicacion
    provideRouter(routes),// registra el enrutador con las rutas definidas en app.routes.ts
     provideHttpClient(withInterceptors([authInterceptor]))
    // registra HttpClient con el interceptor de autenticacion
  ]
};
