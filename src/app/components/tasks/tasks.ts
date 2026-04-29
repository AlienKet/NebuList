import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../services/tasks';
import { CategoriesService } from '../../services/categories';
import { Router , RouterModule} from '@angular/router';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  categoryId: number | null; 
}

@Component({
  selector: 'app-tasks',
  standalone: true,//standalone es para que no sea necesario declararlo en un módulo, se puede usar directamente
  imports: [FormsModule, CommonModule, RouterModule],//importamos FormsModule para usar ngModel en el formulario
  // CommonModule para usar *ngIf y *ngFor, 
  // RouterModule para usar routerLink en el template
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  categories: any[] = []; 

  nuevaTarea = {
    title: '',
    description: '',
    status: 'Pendiente', 
    priority: 'Media',
    dueDate: '',
    categoryId: null as number | null
  };

  errorTarea: string = '';
  mensajeExito: string = '';
  cargando: boolean = false;

  constructor(
    private tasksService: TasksService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {//ngOnInit es el método que se ejecuta al cargar el componente, aquí se llama a cargarDatos para obtener las tareas y 
  // categorías desde el backend
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.categoriesService.obtenerTodas().subscribe({
      next: (cats) => {//cats es para almacenar las categorías obtenidas del backend
        this.categories = cats;
        this.tasksService.obtenerTodas().subscribe({
          next: (ts) => {//ts es para almacenar las tareas obtenidas del backend
            this.tasks = ts;
            this.cargando = false;
          },
          error: () => this.cargando = false
        });
      },
      error: (err) => {// Si el error es 401, redirigimos al login
        //el error 401 significa que el usuario no está autenticado, por lo que se redirige al login para que inicie sesión y 
        // obtenga un token válido
        if (err.status === 401) this.router.navigate(['']);
        this.cargando = false;
      }
    });
  }

 crearTarea(): void {
  this.errorTarea = '';
  this.mensajeExito = '';

  if (!this.nuevaTarea.title) {
    this.errorTarea = 'El titulo es obligatorio';
    return;
  }

  // aqui se construye el payload para enviar al backend, se manejan los campos opcionales como dueDate y 
  // categoryId para evitar problemas de formato o valores no 
  //payload significa la carga útil, es decir, los datos que se van a enviar al backend para crear una nueva tarea
  const payload: any = {
    title: this.nuevaTarea.title,
    description: this.nuevaTarea.description || '',
    status: this.nuevaTarea.status,
    priority: this.nuevaTarea.priority
  };

  // Manejo de fecha
  if (this.nuevaTarea.dueDate) {
    //  Esto es para evitar enviar una fecha vacía o mal formateada
    payload.dueDate = this.nuevaTarea.dueDate;
  } else {
    // Si el backend no acepta null, es mejor no enviar la propiedad si está vacía
    payload.dueDate = null; 
  }

  // Manejo de categoria
  // Si el valor es "null" (como string desde el select) o null real, lo enviamos como null
  if (this.nuevaTarea.categoryId && this.nuevaTarea.categoryId.toString() !== 'null') {
    payload.categoryId = Number(this.nuevaTarea.categoryId);
  } else {
    payload.categoryId = null;
  }

  //aqui se llama al servicio para crear la tarea, se maneja la respuesta para actualizar la lista de tareas y 
  // mostrar mensajes de éxito o error
  this.tasksService.crear(payload as any).subscribe({
    next: (tareaCreada) => {
      this.tasks.push(tareaCreada as unknown as Task);
      this.resetFormulario();
      this.mensajeExito = '¡Tarea guardada correctamente!';
    },
    error: (err) => {
    
      console.log('Cuerpo del error:', err.error);// Esto es para ver qué información está llegando en el error
      this.errorTarea = err.error?.message || 'Error al guardar la tarea';
    }
  });
}
//aqui se llama al servicio para eliminar la tarea,
//  se maneja la respuesta para actualizar la lista de tareas y mostrar mensajes de error si no se pudo eliminar
  eliminarTarea(id: number): void {
    this.tasksService.eliminar(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      error: () => {
        this.errorTarea = 'No se pudo eliminar la tarea';
      }
    });
  }
//se resetea el formulario para crear una nueva tarea
  resetFormulario() {
    this.nuevaTarea = {
      title: '',
      description: '',
      status: 'Pendiente',
      priority: 'Media',
      dueDate: '',
      categoryId: null
    };


  }


 getStatusClass(status: string): string {//
    const s = status.toLowerCase();
    if (s === 'pendiente') return 'status-pending';
    if (s === 'en progreso') return 'status-in-progress';
    if (s === 'completado') return 'status-completed';
    return '';
  }

//aqui se asignan clases CSS según la prioridad de la tarea para mostrar colores diferentes en el template
//esto es para mejorar la visualización de las tareas según su prioridad
getPriorityClass(priority: string): string {
    const p = priority.toLowerCase();
    if (p === 'baja') return 'priority-low';
    if (p === 'media') return 'priority-medium';
    if (p === 'alta') return 'priority-high';
    return '';
  }


}