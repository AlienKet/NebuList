//esta clase es el componente de categorias, aqui se muestra la logica para crear, eliminar y mostrar las categorias del usuario. 
// Tambien se maneja el estado de carga y los mensajes de error o exito.

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // necesario para ngModel
import { CommonModule } from '@angular/common'; // necesario para *ngIf y *ngFor
import { CategoriesService } from '../../services/categories';
// CategoriesService es para comunicarse con el backend de categorias

// Router es para redirigir al usuario si no esta autenticado
// RouterModule es para usar las directivas de routerLink en el template
import { Router, RouterModule } from '@angular/router';

// interface es una estructura de datos que define las propiedades de una categoria
// es como el molde de datos de una categoria
interface Categoria {
  id: string;          // identificador unico de la categoria (uuid del backend)
  name: string;        // nombre de la categoria
  description: string; // descripcion de la categoria
  color: string;       // color en formato hex
  icon: string;        // icono de la categoria
}

@Component({
  selector: 'app-categories',// selector es el nombre de la etiqueta HTML que representa este componente
  standalone: true,// standalone: true indica que este componente no depende de un modulo, se puede usar directamente
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './categories.html',
  
  styleUrls: ['./categories.css']
})
export class CategoriesComponent implements OnInit {
// OnInit es para ejecutar codigo cuando el componente carga por primera vez

  // lista de categorias, se llenara con datos reales del backend
  categorias: Categoria[] = [];

  // objeto que guarda los datos del formulario de nueva categoria
  nuevaCategoria = {
    name: '',        // nombre ingresado en el input
    description: '', // descripcion ingresada en el input
    color: '',       // color ingresado en el input
    icon: ''         // icono ingresado en el input
  };

  errorCategoria: string = '';  // mensaje de error si algo falla
  mensajeExito: string = '';    // mensaje de exito si se creo bien
  cargando: boolean = false;    // controla el estado de carga mientras el backend responde

  constructor(
    private categoriesService: CategoriesService, // inyecta el servicio de categorias
    private router: Router // inyecta el router para redirigir si no hay sesion
  ) {}

  // ngOnInit se ejecuta automaticamente cuando el componente carga.
  // aqui se cargan las categorias del backend al entrar a la pagina
  ngOnInit(): void {
    this.cargarCategorias();
  }

  // obtiene todas las categorias del usuario desde el backend
  cargarCategorias(): void {
    this.cargando = true; // activa el estado de carga

    this.categoriesService.obtenerTodas().subscribe({

      next: (data) => {
      // next es para manejar la respuesta exitosa del backend, data es el array de categorias que devuelve el backend
        this.categorias = data;
        // llena la lista con las categorias reales del backend
        this.cargando = false;
      },

      error: (err) => {
      // error se ejecuta cuando el backend responde con un error
        this.cargando = false;
        if (err.status === 401) {
          this.router.navigate(['']);
          // si el token expiro o no existe redirige al login
        }
        this.errorCategoria = 'Error al cargar las categorias';
      }
    });
  }

  // funcion que se ejecuta cuando el usuario hace clic en Crear Categoria
  crearCategoria(): void {
    this.errorCategoria = ''; // limpia el error anterior
    this.mensajeExito = '';   // limpia el mensaje de exito anterior

    if (!this.nuevaCategoria.name) {
    // verifica que el nombre no este vacio, es el unico campo obligatorio
      this.errorCategoria = 'El nombre es obligatorio';
      return; // para la ejecucion si el nombre esta vacio
    }

    // arma el objeto con los datos del formulario para enviar al backend
    const datos = {
      name: this.nuevaCategoria.name,
      description: this.nuevaCategoria.description,
      color: this.nuevaCategoria.color || '#39ff14', // si no pone color usa el verde neon
      icon: this.nuevaCategoria.icon || '📁'         // si no pone icono usa carpeta
    };

    this.categoriesService.crear(datos).subscribe({

    
      next: (categoriaCreada) => {
      // next se ejecuta cuando el backend crea la categoria exitosamente
        this.categorias.push(categoriaCreada);
        // push agrega la nueva categoria al final de la lista

        // limpia el formulario despues de crear
        this.nuevaCategoria = { name: '', description: '', color: '', icon: '' };
        this.mensajeExito = 'Categoria creada!';
      },

      error: (err) => {
      // error se ejecuta cuando el backend responde con un error
        this.errorCategoria = err.error?.message || 'Error al crear la categoria';
      }
    });
  }

  // funcion que se ejecuta cuando el usuario hace clic en Eliminar
  eliminarCategoria(id: string): void {
  // id es el identificador uuid de la categoria que se quiere eliminar

    this.categoriesService.eliminar(id).subscribe({

      next: () => {
      // next se ejecuta cuando el backend elimina la categoria exitosamente
        this.categorias = this.categorias.filter(cat => cat.id !== id);
        // filter recorre la lista y devuelve solo las categorias que NO tienen ese id
        // es decir, elimina la que si tiene ese id
      },

      error: () => {
        this.errorCategoria = 'Error al eliminar la categoria';
      }
    });
  }
}