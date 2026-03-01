// este archivo es el cerebro del componente, aqui van las variables y funciones que usa el html
// el html muestra todo visualmente pero este archivo es el que hace que todo funcione

import { Component } from '@angular/core'; // Component es para decirle a angular que esta clase es un componente
import { FormsModule } from '@angular/forms'; // FormsModule es para poder usar ngModel en los inputs del html
import { CommonModule } from '@angular/common'; // CommonModule es para poder usar *ngIf en el html

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
  loginPassword: string = ''; // guarda la contrasena que escribe el usuario
  errorLogin: string = ''; // guarda el mensaje de error si el login falla
  mensajeExito: string = ''; // guarda el mensaje si el login fue bien

  // variables del formulario de registro
  registroNombre: string = ''; // guarda el nombre que escribe el usuario
  registroEmail: string = ''; // guarda el email del registro
  registroPassword: string = ''; // guarda la contrasena del registro
  registroConfirm: string = ''; // guarda la confirmacion de la contrasena
  errorRegistro: string = ''; // guarda el mensaje de error si el registro falla
  mensajeExitoRegistro: string = ''; // guarda el mensaje si el registro fue bien

  // funcion para cambiar entre el formulario de login y el de registro
  // se llama desde el html cuando el usuario hace clic en las pestanas o en los enlaces
  cambiarModo(modo: string): void {
    this.modoActual = modo; // cambia el modo al que se recibe, puede ser login o registro
    this.errorLogin = ''; // limpia el error de login al cambiar de pestana
    this.errorRegistro = ''; // limpia el error de registro al cambiar de pestana
    this.mensajeExito = ''; // limpia el mensaje de exito de login al cambiar de pestana
    this.mensajeExitoRegistro = ''; // limpia el mensaje de exito de registro al cambiar de pestana
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

    // si todo esta bien muestra el mensaje de exito
    // aqui mas adelante se conectara con el backend para hacer el login real
    this.mensajeExito = 'Bienvenido!';
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
    // verifica que la contrasena tenga minimo 6 caracteres
      this.errorRegistro = 'La contrasena debe tener al menos 6 caracteres';
      return;
    }

    if (this.registroPassword !== this.registroConfirm) {
    // verifica que la contrasena y la confirmacion sean iguales
    // !== significa que son diferentes
      this.errorRegistro = 'Las contrasenas no coinciden';
      return;
    }
    this.mensajeExitoRegistro = 'Registro exitoso!';
  }

}