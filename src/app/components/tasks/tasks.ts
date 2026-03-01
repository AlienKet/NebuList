

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // necesario para ngModel
import { CommonModule } from '@angular/common'; // necesario para *ngIf, *ngFor y ngClass


interface Tarea {
  id: number;
  title: string;       
  description: string;  
  status: string;       // puede ser pending, in_progress o completed
  priority: string;     // puede ser low, medium o high
  dueDate: string;      // fecha limite, puede estar vacia
  categoryName: string; // nombre de la categoria, puede estar vacio
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent {

  // lista de tareas con datos de ejemplo
  tareas: Tarea[] = [
    {
      id: 1,
      title: 'Tarea',
      description: 'Vistas Front',
      status: 'pending',
      priority: 'high',
      dueDate: '2026-03-15',
      categoryName: 'Trabajo'
    },
    {
      id: 2,
      title: 'Hacer ejercicio',
      description: '30 minutos de cardio',
      status: 'in_progress',
      priority: 'medium',
      dueDate: '',
      categoryName: 'Personal'
    },
    {
      id: 3,
      title: 'Comprar comida',
      description: 'Ir al supermercado',
      status: 'completed',
      priority: 'low',
      dueDate: '2026-03-10',
      categoryName: ''
    },
  ];

  // objeto que guarda los datos del formulario de nueva tarea
  nuevaTarea = {
    title: '',
    description: '',
    status: 'pending',    // valor por defecto del dropdown
    priority: 'medium',   // valor por defecto del dropdown
    dueDate: '',
    categoryName: ''
  };

  errorTarea: string = '';   // mensaje de error si algo falla
  mensajeExito: string = ''; // mensaje de exito si se creo bien
  contadorId: number = 4;    // empieza en 4 porque ya hay 3 de ejemplo

  // funcion que se ejecuta cuando el usuario hace clic en Crear Tarea
  crearTarea(): void {
    this.errorTarea = '';
    this.mensajeExito = '';

    if (!this.nuevaTarea.title) {
    // verifica que el titulo no este vacio
      this.errorTarea = 'El titulo es obligatorio';
      return;
    }

    // crea el objeto tarea con los datos del formulario
    const tarea: Tarea = {
      id: this.contadorId++,
      // ++ aumenta el contador en 1 cada vez que se crea una tarea
      title: this.nuevaTarea.title,
      description: this.nuevaTarea.description,
      status: this.nuevaTarea.status,
      priority: this.nuevaTarea.priority,
      dueDate: this.nuevaTarea.dueDate,
      categoryName: this.nuevaTarea.categoryName
    };

    this.tareas.push(tarea);
    // push agrega la nueva tarea al final de la lista

    // limpia el formulario despues de crear
    this.nuevaTarea = {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      categoryName: ''
    };

    this.mensajeExito = 'Tarea creada!';
  }

  // funcion que devuelve la clase css segun el status de la tarea
  getStatusClass(status: string): string {
    if (status === 'pending') return 'status-pending';
    if (status === 'in_progress') return 'status-in-progress';
    if (status === 'completed') return 'status-completed';
    return '';
  }

  // funcion que devuelve la clase css segun la prioridad de la tarea
  getPriorityClass(priority: string): string {
    if (priority === 'low') return 'priority-low';
    if (priority === 'medium') return 'priority-medium';
    if (priority === 'high') return 'priority-high';
    return '';
  }

  // funcion que se ejecuta cuando el usuario hace clic en Eliminar
  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    // filter devuelve solo las tareas que NO tienen ese id
    // es decir elimina la que si tiene ese id
  }
}