
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login';

describe('Login', () => {//aqui se define el bloque de pruebas para el componente LoginComponent
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {//se configura el entorno de pruebas para el componente LoginComponent utilizando TestBed
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
