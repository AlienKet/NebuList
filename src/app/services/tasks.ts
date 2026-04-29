
// Este servicio maneja toda la comunicación con el backend para las tareas (Tasks)
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TasksService {

  private apiUrl = 'http://localhost:3000/api/tasks';
  // URL base del backend para las rutas de tareas

  constructor(private http: HttpClient) {}

  // Obtiene las tareas. Permite filtrar por estado o categoría si es necesario.
  obtenerTodas(status?: string, categoryId?: number) {
    let params = new HttpParams();
    if (status) params = params.append('status', status);
    if (categoryId) params = params.append('categoryId', categoryId.toString());

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  // Obtiene una sola tarea por su ID
  obtenerUna(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Envía los datos para crear una nueva tarea vinculada al usuario logeado
  crear(tarea: { 
    title: string; 
    description?: string; 
    status?: string; 
    priority?: string; 
    dueDate?: Date; 
    categoryId?: number 
  }) {
    return this.http.post<any>(this.apiUrl, tarea);
  }

  // Actualiza los datos de una tarea existente (título, estado, prioridad, etc.)
  actualizar(id: number, tarea: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tarea);
  }

  // Elimina permanentemente una tarea de la base de datos
  eliminar(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}