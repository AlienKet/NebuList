//en esta clase se realizan pruebas unitarias para el servicio de tareas
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // esto es para simular las peticiones HTTP en las pruebas unitarias
import { TasksService } from './tasks';

describe('TasksService', () => {// se describe el bloque de pruebas para el servicio de tareas
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // aqui se importa el módulo de pruebas HTTP para simular las peticiones en las pruebas unitarias
      providers: [TasksService]
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});