
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
// se importa el componente principal para poder probarlo

describe('AppComponent', () => {
// describe agrupa las pruebas relacionadas con AppComponent

  beforeEach(async () => {
  // beforeEach se ejecuta antes de cada prueba para preparar el entorno
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      // se registra el AppComponent para poder probarlo
    }).compileComponents();
  });

  it('should create the app', () => {
  // esta prueba verifica que el componente se crea sin errores
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    // toBeTruthy verifica que el componente existe y no es null
  });
});