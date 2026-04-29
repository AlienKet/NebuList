//esta clase representa el componente principal de la aplicación, es el punto de entrada de la aplicación y 
// contiene el enrutador para mostrar los diferentes componentes según la ruta.
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], //RouterOutlet es un componente que se encarga de mostrar el componente correspondiente a la ruta actual
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
