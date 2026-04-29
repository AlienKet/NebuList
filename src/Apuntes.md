
ng serve

https://htmlcolorcodes.com/

https://es.piliapp.com/emoji/list/

Lenguaje: TypeScript.

Framework: Angular (Arquitectura basada en componentes standalone).

Comunicación: HttpClient

Funcionalidad: Se encarga de hacer las peticiones al puerto 3000 donde corre NestJS y manejar las respuestas o errores de forma asíncrona.

Estructura:

Componentes: Controlan la vista y la lógica de cada pantalla (Home, Tareas, etc.).

Servicios: Centralizan las llamadas a la API para que el código sea limpio y reutilizable.

Resumen del Flujo de Datos
Angular envía un objeto (ej: una nueva tarea) a través de un servicio.

NestJS recibe la petición en el Controller, la valida con un DTO y el Service procesa la lógica.

TypeORM guarda la información en la base de datos basándose en el Model.

Si algo falla (como un estado de tarea mal escrito), el servidor responde con un 400 Bad Request indicando qué corregir.
