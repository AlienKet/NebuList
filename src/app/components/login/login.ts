// este archivo es el cerebro del componente, aqui van las variables y funciones que usa el html
// el html muestra todo visualmente pero este archivo es el que hace que todo funcione

import { Component } from '@angular/core'; // Component es para decirle a angular que esta clase es un componente
import { FormsModule } from '@angular/forms'; // FormsModule es para poder usar ngModel en los inputs del html
import { CommonModule } from '@angular/common'; // CommonModule es para poder usar *ngIf en el html
import { Router } from '@angular/router'; // Router es para redirigir al usuario despues del login exitoso
import { AuthService } from '../../services/auth'; // AuthService es para conectar con el backend

@Component({
  selector: 'app-login', // nombre del selector, es como se llama este componente en el html
  standalone: true, // indica que este componente funciona solo, no necesita un modulo externo
  imports: [FormsModule, CommonModule], // modulos que necesita este componente para funcionar
  templateUrl: './login.html', // archivo html que va a usar este componente
  styleUrls: ['./login.css'] // archivo css que va a usar este componente
})

export class LoginComponent {

  // variable que controla cual formulario se muestra, empieza en login
  modoActual: string = 'login';

  // variables del formulario de login
  // estas variables se conectan con los inputs del html usando ngModel
  // lo que el usuario escribe en el input se guarda automaticamente aqui
  loginEmail: string = ''; // guarda el email que escribe el usuario
  loginPassword: string = ''; 
  errorLogin: string = ''; 
  mensajeExito: string = ''; 
  cargandoLogin: boolean = false; // controla el estado de carga mientras el backend responde

  // variables del formulario de registro
  registroNombre: string = ''; // guarda el nombre que escribe el usuario
  registroEmail: string = ''; 
  registroPassword: string = ''; 
  registroConfirm: string = ''; 
  errorRegistro: string = ''; 
  mensajeExitoRegistro: string = ''; 
  cargandoRegistro: boolean = false; // controla el estado de carga mientras el backend responde

  constructor(
    private authService: AuthService, // inyecta el servicio de autenticacion para llamar al backend
    private router: Router // inyecta el router para redirigir al usuario despues del login
  ) {}

  // funcion para cambiar entre el formulario de login y el de registro
  // se llama desde el html cuando el usuario hace clic en las pestanas o en los enlaces
  cambiarModo(modo: string): void {
    this.modoActual = modo; // cambia el modo al que se recibe, puede ser login o registro
    this.errorLogin = ''; // limpia el error de login al cambiar de pestaña
    this.errorRegistro = ''; 
    this.mensajeExito = ''; 
    this.mensajeExitoRegistro = ''; 
  }

  // funcion que se ejecuta cuando el usuario hace clic en el boton Entrar
  iniciarSesion(): void {
    this.errorLogin = ''; // limpia el error anterior antes de validar
    this.mensajeExito = ''; // limpia el mensaje de exito anterior

    if (!this.loginEmail || !this.loginPassword) {
    // verifica que los dos campos no esten vacios
      this.errorLogin = 'Debes completar todos los campos';
      return; // para la ejecucion si hay campos vacios
    }

    if (!this.loginEmail.includes('@')) {
    // verifica que el email tenga el simbolo @ para saber si es valido
      this.errorLogin = 'El correo electronico no es valido';
      return; // para la ejecucion si el email no es valido
    }

    this.cargandoLogin = true;
    // activa el estado de carga mientras espera la respuesta del backend

    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
    // subscribe escucha la respuesta del backend cuando llegue
    // es asincrono porque el backend puede tardar en responder

      next: (respuesta) => {
      // next se ejecuta cuando el backend responde con exito (status 200 o 201)
        this.authService.guardarToken(respuesta.token);
        // guarda el token en localStorage para usarlo en las siguientes peticiones

        this.cargandoLogin = false;
        this.mensajeExito = 'Bienvenido!';

        setTimeout(() => {
          this.router.navigate(['/home']);
          // redirige a la pagina de home despues de 1 segundo
        }, 1000);
      },

      error: (err) => {
      // error se ejecuta cuando el backend responde con un error (status 400, 401, etc)
        this.cargandoLogin = false;
        this.errorLogin = err.error?.message || 'Credenciales incorrectas';
        // muestra el mensaje de error que manda el backend, o un mensaje generico
      }
    });
  }

  // funcion que se ejecuta cuando el usuario hace clic en el boton Unirse
  registrarse(): void {
    this.errorRegistro = ''; // limpia el error anterior antes de validar
    this.mensajeExitoRegistro = ''; // limpia el mensaje de exito anterior

    if (!this.registroNombre || !this.registroEmail || !this.registroPassword || !this.registroConfirm) {
    // verifica que todos los campos esten llenos
      this.errorRegistro = 'Todos los campos son obligatorios';
      return; // para la ejecucion si falta algun campo
    }

    if (!this.registroEmail.includes('@')) {
    // verifica que el email del registro tenga el simbolo @
      this.errorRegistro = 'El correo electronico no es valido';
      return;
    }

    if (this.registroPassword.length < 6) {
    // verifica que la contraseña tenga minimo 6 caracteres
      this.errorRegistro = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (this.registroPassword !== this.registroConfirm) {
    // verifica que la contraseña y la confirmacion sean iguales
    // !== significa que son diferentes
      this.errorRegistro = 'Las contraseñas no coinciden';
      return;
    }

    this.cargandoRegistro = true;
    // activa el estado de carga mientras espera la respuesta del backend

   this.authService.registrar(this.registroNombre, this.registroEmail, this.registroPassword).subscribe({
  // subscribe escucha la respuesta del backend cuando llegue

    next: (respuesta) => {
    // next se ejecuta cuando el registro fue exitoso
    // el backend devuelve el token al registrarse, lo guardamos directamente
      this.cargandoRegistro = false;
      this.mensajeExitoRegistro = 'Registro exitoso! Ahora inicia sesion';

      setTimeout(() => {
        this.cambiarModo('login');
        // cambia automaticamente al formulario de login despues de 1.5 segundos
      }, 1500);
    },

    error: (err) => {
    // error se ejecuta cuando el backend responde con un error
      this.cargandoRegistro = false;
      if (err.error?.message === 'Ya existe un usuario con ese email') {
        this.errorRegistro = 'Este correo ya esta registrado, inicia sesion';
      } else {
        this.errorRegistro = err.error?.message || 'Error al registrarse';
      }
      // muestra el mensaje de error que manda el backend, o un mensaje generico
    }
  });
  

  }
  
}