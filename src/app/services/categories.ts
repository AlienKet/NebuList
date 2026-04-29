// este servicio maneja toda la comunicacion con el backend para las categorias

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoriesService {

  private apiUrl = 'http://localhost:3000/api/categories';
  // url base del backend para las rutas de categorias

  constructor(private http: HttpClient) {}

  // obtiene todas las categorias del usuario autenticado
  obtenerTodas() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // obtiene una sola categoria por su id
  obtenerUna(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // crea una nueva categoria
  crear(categoria: { name: string; description?: string; color?: string; icon?: string }) {
    return this.http.post<any>(this.apiUrl, categoria);
  }

  // actualiza una categoria existente
  actualizar(id: string, categoria: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, categoria);
  }

  // elimina una categoria
  eliminar(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}