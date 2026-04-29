
//en esta clase se importan las dependencias necesarias para realizar las pruebas unitarias del componente HomeComponent. 
// Se utiliza TestBed para configurar el entorno de pruebas y 
// ComponentFixture para crear una instancia del componente y acceder a sus propiedades y métodos durante las pruebas
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home'; 

describe('HomeComponent', () => {//aqui se define el bloque de pruebas para el componente HomeComponent
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);//se crea una instancia del componente para las pruebas
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {//aqui se define una prueba que verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
    //toBeTruthy() es una función de Jasmine que verifica que el componente se haya creado correctamente y no sea nulo o indefinido.
  });
});