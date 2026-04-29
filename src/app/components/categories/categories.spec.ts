//en esta clase se realizan las pruebas unitarias para el componente de categorias
// se verifica que el componente se cree correctamente y se puedan realizar las operaciones necesarias para su funcionamiento.
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories';

describe('Categories', () => {//aqui se describe el bloque de pruebas para el componente de categorias
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  //fixture es una herramienta que se utiliza para crear una instancia del componente y realizar pruebas sobre ella

  beforeEach(async () => {//aqui se configura el entorno de pruebas para el componente de categorias
    await TestBed.configureTestingModule({
      //TestBed es  para configurar el entorno de pruebas para un componente en Angular
      imports: [CategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);//aqui se crea una instancia del componente de categorias para realizar las pruebas
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {//aqui se realiza la prueba para verificar que el componente de categorias se cree correctamente
    expect(component).toBeTruthy();
  });
});
