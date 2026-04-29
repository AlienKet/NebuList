import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
//esta clase es para probar que el interceptor se crea correctamente, no hace pruebas de funcionalidad del interceptor
//el interceptor es una función que se ejecuta antes de cada petición HTTP para agregar el token de autenticación a las cabeceras
import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
