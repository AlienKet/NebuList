

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // necesario para ngModel
import { CommonModule } from '@angular/common'; // necesario para *ngIf y *ngFor

// interfaz que define como es una categoria
// es como el molde de datos de una categoria
interface Categoria {
  id: number;       // identificador unico de la categoria
  name: string;     // nombre de la categoria
  description: string; // descripcion de la categoria
  color: string;    // color en formato hex
  icon: string;     // icono de la categoria
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class CategoriesComponent {

  // lista de categorias, empieza con datos de ejemplo para ver como se ve
  categorias: Categoria[] = [
    { id: 1, name: 'Trabajo', description: 'Tareas del trabajo', color: '#39ff14', icon: '💼' },
    { id: 2, name: 'Personal', description: 'Tareas personales', color: '#00ff88', icon: '🌿' },
  ];
  // cuando se conecte al backend esta lista se llenara con datos reales

  // objeto que guarda los datos del formulario de nueva categoria
  nuevaCategoria = {
    name: '',        // nombre ingresado en el input
    description: '', // descripcion ingresada en el input
    color: '',       // color ingresado en el input
    icon: ''         // icono ingresado en el input
  };

  errorCategoria: string = '';  // mensaje de error si algo falla
  mensajeExito: string = '';    // mensaje de exito si se creo bien
  contadorId: number = 3;       // contador para generar ids unicos, empieza en 3 porque ya hay 2 de ejemplo

  // funcion que se ejecuta cuando el usuario hace clic en Crear Categoria
  crearCategoria(): void {
    this.errorCategoria = ''; // limpia el error anterior
    this.mensajeExito = '';   // limpia el mensaje de exito anterior

    if (!this.nuevaCategoria.name) {
    // verifica que el nombre no este vacio, es el unico campo obligatorio
      this.errorCategoria = 'El nombre es obligatorio';
      return; // para la ejecucion si el nombre esta vacio
    }

    // crea un nuevo objeto categoria con los datos del formulario
    const categoria: Categoria = {
      id: this.contadorId++, // asigna el id y luego aumenta el contador
      name: this.nuevaCategoria.name,
      description: this.nuevaCategoria.description,
      color: this.nuevaCategoria.color || '#39ff14', // si no pone color usa el verde neon
      icon: this.nuevaCategoria.icon || '📁'         // si no pone icono usa carpeta
    };

    this.categorias.push(categoria);
    // push agrega la nueva categoria al final de la lista

    // limpia el formulario despues de crear
    this.nuevaCategoria = { name: '', description: '', color: '', icon: '' };
    this.mensajeExito = 'Categoria creada!';
  }

  // funcion que se ejecuta cuando el usuario hace clic en Eliminar
  eliminarCategoria(id: number): void {
  // id es el identificador de la categoria que se quiere eliminar

    this.categorias = this.categorias.filter(cat => cat.id !== id);
    // filter recorre la lista y devuelve solo las categorias que NO tienen ese id
    // es decir, elimina la que si tiene ese id
  }
}