// este archivo define las rutas de la app
// cada ruta es una url que lleva a un componente diferente

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
// importamos el componente login para asignarlo a la ruta raiz

import { CategoriesComponent } from './components/categories/categories';
// importamos el componente categories para asignarlo a su ruta

import { TasksComponent } from './components/tasks/tasks';
// importamos el componente tasks para asignarlo a su ruta

export const routes: Routes = [
  { path: '', component: LoginComponent },
  // path vacio significa la ruta raiz, o sea localhost:4200
  // cuando el usuario entra a la app ve el login primero

  { path: 'categories', component: CategoriesComponent },
  // localhost:4200/categories lleva a la vista de categorias

  { path: 'tasks', component: TasksComponent },
  // localhost:4200/tasks lleva a la vista de tareas

  { path: '**', redirectTo: '' }
  // ** significa cualquier ruta que no existe
  // redirige al login si el usuario escribe una url que no existe
];