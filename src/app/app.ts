import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login';
// importamos el componente login para poder usarlo en el html

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent], // registramos el componente login aqui
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
