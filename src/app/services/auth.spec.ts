//esta clase es para probar el servicio de autenticacion, se crea un test para verificar que el servicio se crea correctamente.
import { TestBed } from '@angular/core/testing';

import { AuthService} from './auth';

describe('Auth', () => {//aqui se describe el test, se le da un nombre y se crea una funcion que contiene el test
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
