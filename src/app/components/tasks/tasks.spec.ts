import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks';

describe('TasksComponent', () => {
  let component: TasksComponent;//aqui se declara la variable del componente que se va a probar
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({//aqui se configura el módulo de pruebas, se declara el componente que se va a probar
      imports: [TasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksComponent);//aqui se crea el componente y se asigna a la variable fixture
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {//aqui se define la prueba, en este caso se verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });
});
