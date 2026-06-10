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

**Render**
Es una plataforma en la nube (conocida como Plataforma como Servicio o PaaS) utilizada para alojar (hostear) proyectos web, bases de datos y aplicaciones.

**Lenguaje:** TypeScript.

**Framework:** Angular (Arquitectura basada en componentes standalone)

**Components:** Es una pieza de la interfaz (un botón, una lista, una página entera). Se divide en Lógica (.ts), Vista (.html) y Estilo (.css).

**Interceptors:** Es como un punto de control en donde pasan las peticiones HTTP antes de que vallan al Back, a cada mensaje que va hacia el back le pone el token de seguridad JWT

**Services:** Es el "mensajero". Se encarga de hacer las llamadas al back-end y traer los datos de vuelta para que los componentes los usen.

**Dependencia**: Son bloques de código, librerías o herramientas externas. Para no escribir codigo desde 0 o funciones, se llama a esas librerias o codigos prefabricados

**Inyección de Dependencias:** Es una forma de decirle a Angular: "necesito el servicio de tareas aquí", y Angular lo entrega automáticamente en el constructor.

**HTTP** significa Protocolo de Transferencia de Hipertexto. Es el conjunto de reglas y el "idioma" estándar que utilizan las computadoras para comunicarse y transmitir datos a través de internet.

**GET:** Utilizado por el Frontend para solicitar y leer información (por ejemplo, traer la lista de tareas o categorías desde el servidor).

**POST:** Utilizado para enviar datos nuevos al servidor con el fin de crear un recurso (por ejemplo, registrar un nuevo usuario o guardar una nueva tarea).

**PUT** Utilizados para modificar o actualizar datos que ya existen en el servidor (por ejemplo, cambiar el estado de una tarea a "Terminada").

**DELETE:** Utilizado para eliminar permanentemente un recurso del servidor (por ejemplo, borrar una categoría).

**Frontend (Cliente):** Es la parte visual del proyecto, lo que se carga en el navegador web y con lo que el usuario interactúa directamente (botones, formularios, colores). 
**Backend (Servidor):** Es el sistema que funciona "detrás de escena". El Frontend le envía peticiones al Backend (por ejemplo: "guarda este nuevo usuario" o "dame la lista de tareas"). El Backend recibe la petición, procesa la lógica pesada, consulta la base de datos y le devuelve una respuesta al Frontend.

## Los Tres Pilares del Frontend

**HTML (HyperText Markup Language):** Es el "esqueleto" o la estructura de la página.
**CSS (Cascading Style Sheets):** Es el diseño visual. 
**TS (TypeScript):** Es la lógica de la aplicación. Es una versión mejorada y más estricta de JavaScript. Los archivos terminados en `.ts` controlan lo que sucede cuando el usuario interactúa con la página. Si un usuario hace clic en un botón de "Registrarse", el archivo TypeScript es el encargado de capturar ese clic, leer lo que se escribió en los campos de texto y enviar esa información al Servidor.

## Estructura de Componentes
El proyecto organiza estos tres lenguajes en algo llamado "Componentes". En lugar de tener un solo archivo gigante para toda la página web, el sistema se divide en piezas pequeñas. Por ejemplo, la sección de inicio tiene su propio conjunto:
1. `home.html` (para su estructura).
2. `home.css` (para su diseño).
3. `home.ts` (para su lógica).

## Lógica de Flujo:
**Evento:** El usuario hace clic en un botón (ej: "Empezar tarea").

**Acción:** El Componente llama a una función que usa un Servicio.

**Suscripción:** El servicio envía la petición al Back y el Componente espera la respuesta con un .subscribe().

**Renderizado:** Cuando llegan los datos, Angular actualiza la pantalla automáticamente (Reactividad). Osea vuelve a dibujar la interfaz o solamente donde se hizo un cambio

**Suscripcion** Conecta un componente de la pantalla con un flujo de datos que viene desde internet (un *Observable*).
**Función:** Activa las peticiones hacia el Backend. Por diseño, las solicitudes están "dormidas"; si el código no se suscribe a ellas, el navegador nunca enviará el mensaje ni recibirá los datos.
