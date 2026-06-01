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
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
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

  // Variables para la edicion
  editando: boolean = false;
  tareaEditandoId: number | null = null;

  errorTarea: string = '';
  mensajeExito: string = '';
  cargando: boolean = false;

  constructor(
    private tasksService: TasksService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.categoriesService.obtenerTodas().subscribe({
      next: (cats) => {
        this.categories = cats;
        this.tasksService.obtenerTodas().subscribe({
          next: (ts) => {
            this.tasks = ts;
            this.cargando = false;
          },
          error: () => this.cargando = false
        });
      },
      error: (err) => {
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

    const payload: any = {
      title: this.nuevaTarea.title,
      description: this.nuevaTarea.description || '',
      status: this.nuevaTarea.status,
      priority: this.nuevaTarea.priority
    };

    if (this.nuevaTarea.dueDate) {
      payload.dueDate = this.nuevaTarea.dueDate;
    } else {
      payload.dueDate = null; 
    }

    if (this.nuevaTarea.categoryId && this.nuevaTarea.categoryId.toString() !== 'null') {
      payload.categoryId = Number(this.nuevaTarea.categoryId);
    } else {
      payload.categoryId = null;
    }

    this.tasksService.crear(payload).subscribe({
      next: (tareaCreada) => {
        this.tasks.push(tareaCreada as unknown as Task);
        this.resetFormulario();
        this.mensajeExito = '¡Tarea guardada correctamente!';
      },
      error: (err) => {
        console.log('Cuerpo del error:', err.error);
        this.errorTarea = err.error?.message || 'Error al guardar la tarea';
      }
    });
  }

  // Carga los datos al formulario para editar
  seleccionarParaEditar(task: Task): void {
    this.editando = true;
    this.tareaEditandoId = task.id;
    this.nuevaTarea = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      // Se extrae solo yyyy-MM-dd si viene con zona horaria completa
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
      categoryId: task.categoryId
    };
    this.errorTarea = '';
    this.mensajeExito = '';
  }

  // Actualiza la tarea en base de datos
  actualizarTarea(): void {
    if (!this.tareaEditandoId) return;

    this.errorTarea = '';
    this.mensajeExito = '';

    if (!this.nuevaTarea.title) {
      this.errorTarea = 'El título es obligatorio';
      return;
    }

    const payload: any = {
      title: this.nuevaTarea.title,
      description: this.nuevaTarea.description || '',
      status: this.nuevaTarea.status,
      priority: this.nuevaTarea.priority,
      dueDate: this.nuevaTarea.dueDate || null,
      categoryId: this.nuevaTarea.categoryId && this.nuevaTarea.categoryId.toString() !== 'null' 
        ? Number(this.nuevaTarea.categoryId) 
        : null
    };

    this.tasksService.actualizar(this.tareaEditandoId, payload).subscribe({
      next: (tareaActualizada) => {
        const index = this.tasks.findIndex(t => t.id === this.tareaEditandoId);
        if (index !== -1) {
          this.tasks[index] = tareaActualizada as unknown as Task;
        }
        this.cancelarEdicion();
        this.mensajeExito = '¡Tarea actualizada correctamente!';
      },
      error: (err) => {
        this.errorTarea = err.error?.message || 'Error al actualizar la tarea';
      }
    });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.tareaEditandoId = null;
    this.resetFormulario();
  }

  eliminarTarea(id: number): void {
    this.tasksService.eliminar(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        if (this.tareaEditandoId === id) this.cancelarEdicion();
      },
      error: () => {
        this.errorTarea = 'No se pudo eliminar la tarea';
      }
    });
  }

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

  getStatusClass(status: string): string {
    const s = status.toLowerCase();
    if (s === 'pendiente') return 'status-pending';
    if (s === 'en progreso') return 'status-in-progress';
    if (s === 'completado') return 'status-completed';
    return '';
  }

  getPriorityClass(priority: string): string {
    const p = priority.toLowerCase();
    if (p === 'baja') return 'priority-low';
    if (p === 'media') return 'priority-medium';
    if (p === 'alta') return 'priority-high';
    return '';
  }
}