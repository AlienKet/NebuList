//prueba de servicio de categorias
import { TestBed } from '@angular/core/testing';//importamos el servicio de categorias para poder probarlo
import { CategoriesService } from './categories';

describe('CategoriesService', () => {//aqui se describe el test, se le da un nombre y se crea una funcion que contiene el test
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});