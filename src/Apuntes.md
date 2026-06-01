
## url para los colores:
https://htmlcolorcodes.com/
## url para emojis:
https://emojiterra.com/es/

## url de render:
https://nebulistfront.onrender.com

## ejemplo de usuario:
"username": "Alien",
  "email": "alien@gmail.com",
  "password": "123456"

## Front-end
El front-end es la cara y la experiencia. Su trabajo es mostrar datos de forma bonita y reaccionar a lo que hace el usuario.

### Alojamiento Web (Hosting en Render)
**¿Qué es Render?** Es una plataforma en la nube (conocida como Plataforma como Servicio o PaaS) utilizada para alojar (hostear) proyectos web, bases de datos y aplicaciones.

**Lenguaje:** TypeScript.

**Framework:** Angular (Arquitectura basada en componentes standalone)

**Components:** Es una pieza de la interfaz (un botón, una lista, una página entera). Se divide en Lógica (.ts), Vista (.html) y Estilo (.css).

**Services:** Es el "mensajero". Se encarga de hacer las llamadas al back-end y traer los datos de vuelta para que los componentes los usen.


**Inyección de Dependencias:** Es una forma de decirle a Angular: "necesito el servicio de tareas aquí", y Angular te lo entrega automáticamente en el constructor.

## Lógica de Flujo:
**Evento:** El usuario hace clic en un botón (ej: "Empezar tarea").

**Acción:** El Componente llama a una función que usa un Servicio.

**Suscripción:** El servicio envía la petición al Back y el Componente espera la respuesta con un .subscribe().

**Renderizado:** Cuando llegan los datos, Angular actualiza la pantalla automáticamente (Reactividad). Osea vuelve a dibujar la interfaz o solamente donde se hizo un cambio

**Lenguaje:** TypeScript.

**Framework:** Angular (Arquitectura basada en componentes standalone)

### Interceptors (Interceptores HTTP)

**Definición:** Actúan como un punto de control central (similar a una aduana) por donde pasan obligatoriamente todas las peticiones HTTP antes de salir hacia el Servidor (Backend) y al regresar de él.
* **Función principal:** Automatizar procesos repetitivos, especialmente los de seguridad. Se encargan de inyectar automáticamente el token de autenticación (JWT) a cada solicitud que realiza la aplicación, eliminando la necesidad de escribir este código manualmente en cada uno de los servicios.

## El funcionamiento de las aplicaciones web modernas se divide en dos partes principales que se comunican entre sí: el Cliente y el Servidor. 

**Frontend (Cliente):** Es la parte visual del proyecto, lo que se carga en el navegador web y con lo que el usuario interactúa directamente (botones, formularios, colores). **Este proyecto en específico es un Frontend.** Su trabajo principal es mostrar la información y capturar las acciones del usuario.
**Backend (Servidor):** Es el sistema que funciona "detrás de escena". El Frontend le envía peticiones al Backend (por ejemplo: "guarda este nuevo usuario" o "dame la lista de tareas"). El Backend recibe la petición, procesa la lógica pesada, consulta la base de datos y le devuelve una respuesta al Frontend.

## Los Tres Pilares del Frontend

**HTML (HyperText Markup Language):** Es el "esqueleto" o la estructura de la página. Los archivos terminados en `.html` se encargan de definir qué elementos existen en la pantalla. Dictan dónde va un título, dónde va un botón, dónde va una imagen y dónde va una caja de texto. No tienen diseño ni lógica, solo declaran el contenido.
**CSS (Cascading Style Sheets):** Es la "pintura" o el diseño visual. Los archivos terminados en `.css` toman el esqueleto creado en HTML y le dan estilo. Se utilizan para definir los colores (como los tonos oscuros y los brillos verdes neón del proyecto), los tamaños, las sombras, el tipo de letra y la posición exacta de cada elemento en la pantalla.
**TS (TypeScript):** Es el "cerebro" o la lógica de la aplicación. Es una versión mejorada y más estricta de JavaScript. Los archivos terminados en `.ts` controlan lo que sucede cuando el usuario interactúa con la página. Si un usuario hace clic en un botón de "Registrarse", el archivo TypeScript es el encargado de capturar ese clic, leer lo que se escribió en los campos de texto y enviar esa información al Servidor.

## Estructura de Componentes
El proyecto organiza estos tres lenguajes en algo llamado "Componentes". En lugar de tener un solo archivo gigante para toda la página web, el sistema se divide en piezas pequeñas. Por ejemplo, la sección de inicio tiene su propio conjunto:
1. `home.html` (para su estructura).
2. `home.css` (para su diseño).
3. `home.ts` (para su lógica).


