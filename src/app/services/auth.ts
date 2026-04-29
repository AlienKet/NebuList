// este servicio maneja toda la comunicacion con el backend para login y registro

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// HttpClient es para hacer peticiones HTTP al backend

import { Router } from '@angular/router';
// Router es para redirigir al usuario despues del login

@Injectable({ providedIn: 'root' })
// providedIn root significa que este servicio esta disponible en toda la app

export class AuthService {

  private apiUrl = 'http://localhost:3000/api/accounts';
  // url base del backend para las rutas de cuentas

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // envia las credenciales al backend para iniciar sesion
  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // envia los datos al backend para registrar un nuevo usuario
  registrar(username: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/registrar`, { username, email, password });
  }

  // guarda el token en localStorage despues del login exitoso
  guardarToken(token: string): void {
    localStorage.setItem('nebulist_token', token);
  }

  // obtiene el token guardado en localStorage
  obtenerToken(): string | null {
    return localStorage.getItem('nebulist_token');
  }

  // verifica si el usuario esta autenticado
  estaAutenticado(): boolean {
    return this.obtenerToken() !== null;
  }

  // elimina el token y redirige al login
  cerrarSesion(): void {
    localStorage.removeItem('nebulist_token');
    this.router.navigate(['']);
  }
}