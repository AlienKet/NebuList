
ng serve

https://htmlcolorcodes.com/

https://es.piliapp.com/emoji/list/

"username": "Alien",
  "email": "alien@gmail.com",
  "password": "123456"

El front-end es la cara y la experiencia. Su trabajo es mostrar datos de forma bonita y reaccionar a lo que hace el usuario.

Componente: Es una pieza de la interfaz (un botón, una lista, una página entera). Se divide en Lógica (.ts), Vista (.html) y Estilo (.css).

Servicio (Front): Es el "mensajero". Se encarga de hacer las llamadas al back-end y traer los datos de vuelta para que los componentes los usen.


Inyección de Dependencias: Es una forma de decirle a Angular: "necesito el servicio de tareas aquí", y Angular te lo entrega automáticamente en el constructor.

Lógica de Flujo:
Evento: El usuario hace clic en un botón (ej: "Empezar tarea").

Acción: El Componente llama a una función que usa un Servicio.

Suscripción: El servicio envía la petición al Back y el Componente espera la respuesta con un .subscribe().

Renderizado: Cuando llegan los datos, Angular actualiza la pantalla automáticamente (Reactividad).

Lenguaje: TypeScript.

Framework: Angular (Arquitectura basada en componentes standalone).

Interceptors: Es como un oficial de aduanas por el cual los mensajes  (peticiones HTTP)  deben de pasar antes de salir de la aplicación hacia el Back-end, y también cuando regresan. 
Su función principal es la automatización de la seguridad. En lugar de escribir el código para añadir el token de seguridad (JWT) manualmente en cada llamada que se hace desde los servicios, el interceptor lo hace automaticamentet


