import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { TasksService } from '../../services/tasks'; 
import { CategoriesService } from '../../services/categories';
import { forkJoin } from 'rxjs'; 

interface Categoria {
  id: number;
  name: string;
  color: string;
  icon: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string; 
  dueDate: string | Date | null; 
  categoryId: number;
}

interface TareasAgrupadas {
  categoria: Categoria;
  tareas: Task[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  tareasPendientesAgrupadas: TareasAgrupadas[] = [];
  tareasPorVencer: Task[] = [];
  tareasCompletadasOVencidas: Task[] = [];
  cargando: boolean = false;

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private categoriesService: CategoriesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatosReales();
  }

  cerrarSesion(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/']); 
  }
  
  irACategorias(): void {
    this.router.navigate(['/categories']); 
  }

  irATareas(): void {
    this.router.navigate(['/tasks']); 
  }

  cambiarEstado(tarea: any, nuevoEstado: string): void {
    this.tasksService.actualizar(tarea.id, { status: nuevoEstado }).subscribe({
      next: () => {
        this.cargarDatosReales();
      },
      error: (err) => console.error('Error al actualizar estado', err)
    });
  }

  // Método nuevo para eliminar la tarea y actualizar las 3 listas del Dashboard inmediatamente
  eliminarTareaDesdeHome(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea de tu agenda?')) {
      this.tasksService.eliminar(id).subscribe({
        next: () => {
          this.cargarDatosReales(); // Recarga y re-agrupa todo automáticamente
        },
        error: (err) => {
          console.error('Error al eliminar la tarea desde el Home:', err);
        }
      });
    }
  }

  cargarDatosReales(): void {
    this.cargando = true;

    forkJoin({
      categorias: this.categoriesService.obtenerTodas(),
      tareas: this.tasksService.obtenerTodas()
    }).subscribe({
      next: (resultado) => {
        
        console.log('Categorías recibidas:', resultado.categorias);
        console.log('Tareas recibidas:', resultado.tareas);
        const misCategorias: Categoria[] = resultado.categorias;
        const misTareas: Task[] = resultado.tareas;

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const limiteVencimiento = new Date();
        limiteVencimiento.setDate(hoy.getDate() + 2);
        limiteVencimiento.setHours(23, 59, 59, 999);

        // 1. Historial
        this.tareasCompletadasOVencidas = misTareas.filter(t => 
          t.status?.toLowerCase() === 'completado' || t.status?.toLowerCase() === 'completed'
        );

        // 2. Proximas a Vencer 
        this.tareasPorVencer = misTareas.filter(t => {
          const s = t.status?.toLowerCase();
          if (!t.dueDate || s === 'completado' || s === 'completed') return false;
          
          const fechaTarea = new Date(t.dueDate);
          fechaTarea.setMinutes(fechaTarea.getMinutes() + fechaTarea.getTimezoneOffset());
          fechaTarea.setHours(0, 0, 0, 0);

          const esEnProgreso = s === 'en progreso' || s === 'in_progress';
          const vencePronto = fechaTarea >= hoy && fechaTarea <= limiteVencimiento;

          return esEnProgreso || vencePronto;
        });

        // 3. Pendientes Agrupadas
        const pendientes = misTareas.filter(t => {
          const s = t.status?.toLowerCase();
          const esPendiente = s === 'pendiente' || s === 'pending';
          const noEstaEnVencer = !this.tareasPorVencer.find(tpv => tpv.id === t.id);
          return esPendiente && noEstaEnVencer;
        });
        
        this.tareasPendientesAgrupadas = misCategorias.map(cat => {
          return {
            categoria: cat,
            tareas: pendientes.filter(t => {
              const idDeLaTarea = t.categoryId || (t as any).category?.id;
              return Number(idDeLaTarea) === Number(cat.id);
            })
          };
        }).filter(grupo => grupo.tareas.length > 0);

        this.cargando = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar datos del Centro de Mando', err);
        this.cargando = false;
        if (err.status === 401) this.router.navigate(['/']);
      }
    });
  }
}