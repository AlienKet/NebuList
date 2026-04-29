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

  const limiteVencimiento = new Date();
  limiteVencimiento.setDate(hoy.getDate() + 2);
  limiteVencimiento.setHours(23, 59, 59, 999);

  // 1. Historial
  this.tareasCompletadasOVencidas = misTareas.filter(t => 
    t.status?.toLowerCase() === 'completado' || t.status?.toLowerCase() === 'completed'
  );

  // 2. Proximas a Vencer (Cualquier tarea que venza entre hoy y pasado mañana)
  this.tareasPorVencer = misTareas.filter(t => {
    const status = t.status?.toLowerCase();
    if (!t.dueDate || status === 'completado' || status === 'completed') return false;
    
    const fechaTarea = new Date(t.dueDate);
    // Ajuste para evitar desfases de zona horaria del navegador
    fechaTarea.setMinutes(fechaTarea.getMinutes() + fechaTarea.getTimezoneOffset());
    fechaTarea.setHours(0, 0, 0, 0);

    return fechaTarea >= hoy && fechaTarea <= limiteVencimiento;
  });

  // 3. Pendientes Agrupadas: TODO lo que no este completado ni este por vencer
const pendientes = misTareas.filter(t => {
  const s = t.status?.toLowerCase();
  // Aceptar cualquier variante de pendiente o en progreso
  const esPendiente = s === 'pendiente' || s === 'en progreso' || s === 'pending' || s === 'in_progress';
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