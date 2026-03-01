import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login';
// importamos el componente login para poder usarlo en el html
import { CategoriesComponent } from './components/categories/categories';
import { TasksComponent } from './components/tasks/tasks';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, CategoriesComponent, TasksComponent], // registramos el componente tasks aqui
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
