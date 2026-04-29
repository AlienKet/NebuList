// este interceptor agrega el token JWT automaticamente en cada peticion HTTP

import { HttpInterceptorFn } from '@angular/common/http';
// HttpInterceptorFn es el tipo de interceptor que usa Angular 17+

export const authInterceptor: HttpInterceptorFn = (req, next) => {
// req: la peticion HTTP que se va a enviar
// next: la funcion que continua con la peticion

  const token = localStorage.getItem('nebulist_token');
  // obtiene el token guardado en localStorage

  if (token) {
    // si hay token, clona la peticion y agrega el header Authorization
    const reqConToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
        // formato requerido por el backend: Bearer + espacio + token
      }
    });
    return next(reqConToken); // continua con la peticion modificada
  }

  return next(req); // si no hay token, continua la peticion sin modificar
};