import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { CategoriesService } from '../../services/categories';
import { Router, RouterModule } from '@angular/router';

interface Categoria {
  id: string;          
  name: string;        
  description: string; 
  color: string;       
  icon: string;        
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class CategoriesComponent implements OnInit {

  categorias: Categoria[] = [];

  nuevaCategoria = {
    name: '',        
    description: '', 
    color: '',       
    icon: ''         
  };

  // Variables de control para la edición
  editando: boolean = false;
  categoriaEditandoId: string | null = null;

  errorCategoria: string = '';  
  mensajeExito: string = '';    
  cargando: boolean = false;    

  constructor(
    private categoriesService: CategoriesService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.cargando = true; 
    this.categoriesService.obtenerTodas().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        if (err.status === 401) {
          this.router.navigate(['']);
        }
        this.errorCategoria = 'Error al cargar las categorias';
      }
    });
  }

  crearCategoria(): void {
    this.errorCategoria = ''; 
    this.mensajeExito = '';   

    if (!this.nuevaCategoria.name) {
      this.errorCategoria = 'El nombre es obligatorio';
      return; 
    }

    const datos = {
      name: this.nuevaCategoria.name,
      description: this.nuevaCategoria.description,
      color: this.nuevaCategoria.color || '#39ff14', 
      icon: this.nuevaCategoria.icon || '📁'         
    };

    this.categoriesService.crear(datos).subscribe({
      next: (categoriaCreada) => {
        this.categorias.push(categoriaCreada);
        this.nuevaCategoria = { name: '', description: '', color: '', icon: '' };
        this.mensajeExito = 'Categoria creada!';
      },
      error: (err) => {
        this.errorCategoria = err.error?.message || 'Error al crear la categoria';
      }
    });
  }

  // Sube los datos de la categoría seleccionada al formulario
  seleccionarParaEditar(categoria: Categoria): void {
    this.editando = true;
    this.categoriaEditandoId = categoria.id;
    this.nuevaCategoria = {
      name: categoria.name,
      description: categoria.description,
      color: categoria.color,
      icon: categoria.icon
    };
    this.errorCategoria = '';
    this.mensajeExito = '';
  }

  // Envía los datos actualizados al backend
  actualizarCategoria(): void {
    if (!this.categoriaEditandoId) return;

    this.errorCategoria = '';
    this.mensajeExito = '';

    if (!this.nuevaCategoria.name) {
      this.errorCategoria = 'El nombre es obligatorio';
      return;
    }

    const datos = {
      name: this.nuevaCategoria.name,
      description: this.nuevaCategoria.description,
      color: this.nuevaCategoria.color || '#39ff14',
      icon: this.nuevaCategoria.icon || '📁'
    };

    // Usamos el método actualizar de tu estructura de servicios REST
    this.categoriesService.actualizar(this.categoriaEditandoId, datos).subscribe({
      next: (categoriaActualizada) => {
        const index = this.categorias.findIndex(cat => cat.id === this.categoriaEditandoId);
        if (index !== -1) {
          this.categorias[index] = categoriaActualizada;
        }
        this.cancelarEdicion();
        this.mensajeExito = '¡Categoría actualizada correctamente!';
      },
      error: (err) => {
        this.errorCategoria = err.error?.message || 'Error al actualizar la categoría';
      }
    });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.categoriaEditandoId = null;
    this.nuevaCategoria = { name: '', description: '', color: '', icon: '' };
    this.errorCategoria = '';
  }

  eliminarCategoria(id: string): void {
    this.categoriesService.eliminar(id).subscribe({
      next: () => {
        this.categorias = this.categorias.filter(cat => cat.id !== id);
        if (this.categoriaEditandoId === id) this.cancelarEdicion();
      },
      error: () => {
        this.errorCategoria = 'Error al eliminar la categoria';
      }
    });
  }
}