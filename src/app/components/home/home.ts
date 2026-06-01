import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
//Component es para definir un componente de Angular
//OnInit es una interfaz que se implementa para ejecutar código al iniciar el componente
// ChangeDetectorRef es para forzar la actualización de la vista después de cargar los datos
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { TasksService } from '../../services/tasks'; 
import { CategoriesService } from '../../services/categories';
import { forkJoin } from 'rxjs'; // es para ejecutar múltiples observables en paralelo y esperar a que todos hayan emitido su valor antes de continuar

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
    private cd: ChangeDetectorRef//esto es para forzar la actualización de la vista después de cargar los datos
  ) {}

  ngOnInit(): void {//carga los datos al iniciar el componente
    this.cargarDatosReales();
  }

cerrarSesion(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/']); 
  }
  
  irACategorias(): void {// Navega a la página de categorías
    this.router.navigate(['/categories']); 
  }

  irATareas(): void {
    this.router.navigate(['/tasks']); 
  }

  // Cambia el estado de una tarea y recarga los datos
  cambiarEstado(tarea: any, nuevoEstado: string): void {
    // Solo se envia el campo status para actualizar
    this.tasksService.actualizar(tarea.id, { status: nuevoEstado }).subscribe({
      next: () => {
        // Recarga los datos para que la tarea se mueva de columna automáticamente
        this.cargarDatosReales();
      },
      error: (err) => console.error('Error al actualizar estado', err)
    });
  }

  // Obtener los datos
  cargarDatosReales(): void {
    this.cargando = true;

    // Se usa forkJoin para esperar a que el backend responda con ambas listas
    forkJoin({//forkJoin es un operador de RxJS que nos permite ejecutar múltiples observables en paralelo y esperar a que todos hayan emitido su valor antes de continuar
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
// Para calcular el límite de vencimiento, se toma la fecha actual y se le suman 2 días, 
// luego se ajusta a las 23:59:59 para incluir todo el día de pasado mañana
  const limiteVencimiento = new Date();
  limiteVencimiento.setDate(hoy.getDate() + 2);
  limiteVencimiento.setHours(23, 59, 59, 999);

  // 1. Historial
  this.tareasCompletadasOVencidas = misTareas.filter(t => 
    t.status?.toLowerCase() === 'completado' || t.status?.toLowerCase() === 'completed'
  );

  // 2. Proximas a Vencer (Cualquier tarea que venza entre hoy y pasado mañana)
this.tareasPorVencer = misTareas.filter(t => {
          const s = t.status?.toLowerCase();
          if (!t.dueDate || s === 'completado' || s === 'completed') return false;
          //t es una tarea, s es su estado en minúsculas. Si no tiene fecha de vencimiento o ya está completada, no va a esta sección
// Convertir la fecha de vencimiento a un objeto Date y normalizarlo a la medianoche para comparaciones
          const fechaTarea = new Date(t.dueDate);
          fechaTarea.setMinutes(fechaTarea.getMinutes() + fechaTarea.getTimezoneOffset());
          //getTimezoneOffset() devuelve la diferencia, en minutos, entre la hora local y la hora UTC. 
          // Al sumar esta diferencia a la fecha, se ajusta la fecha a la hora local del usuario.
          fechaTarea.setHours(0, 0, 0, 0);

          // Si el estado es "en progreso", va aquí directo. 
          // Si es pendiente, revisamos si vence pronto.
          const esEnProgreso = s === 'en progreso' || s === 'in_progress';
          const vencePronto = fechaTarea >= hoy && fechaTarea <= limiteVencimiento;

          return esEnProgreso || vencePronto;
        });

  // 3. Pendientes Agrupadas: TODO lo que no este completado ni este por vencer
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
    
      const idDeLaTarea = t.categoryId || (t as any).category?.id;//esto es para manejar ambos casos: si el backend devuelve categoryId o
      //  un objeto category dentro de la tarea
      
      // Forzar que ambos sean números para que la comparación (===) no falle
      return Number(idDeLaTarea) === Number(cat.id);
    })
    };
  }).filter(grupo => grupo.tareas.length > 0);

  this.cargando = false;
  this.cargando = false;
        this.cd.detectChanges();
      },
      
      error: (err) => {
        console.error('Error al cargar datos del Centro de Mando', err);
        this.cargando = false;
        // Si hay error de token (401), se manda al login
        if (err.status === 401) this.router.navigate(['/']);
      }
    });
  }
}