# mock
Servicios REST a partir de la tabla mock_data

## Requisitos
Iniciar el motor Mysql y ejecutar el script adjunto `Users.sql` (creación de tabla y registros de prueba) con un usuario privilegiado.
Editar el archivo `conexion.js` con los datos locales de conexión y una cuenta con permisos suficientes.
El usuario que ejecuara node debe tener permisos para abrir puertos.
Programado en node version 4.2.6

## Ejecución
Luego de descargar el proyecto ejecutar `npm install` en la linea de comando dentro del mismo directorio. Esto instalara las dependencia.

```sh
npm install
```
La api correra en el puerto `port 3000`, puede ser editado en el archivo `app.js`.
```sh
node app.js
```
[localhost:3000](http://localhost:3000/)

## API
```sh
GET     /users          ##retorna todos los usuarios

GET     /users/{id}     ##retorna la info de un usuario a partir de su id

POST    /users          ##crea un usuario se debe enviar por json raw los datos
                        ##first_name, last_name, email, password, Username
                        
PUT     /users/{id}     ##Actualiza lso datos del usuario por id, se debe enviar por json raw los nuevos datos
                        ##first_name, last_name, email, password
                        
DELETE  /users          ##Elimina un usuario por id

POST    /login          ##Se debe enviar por json raw
                        ##user, pass
```
Adjunto link y collection en POSTMAN para pruebas (`mock.postman_collection.json`).
https://www.getpostman.com/collections/5e7889c680c0c3a40f50

## Observaciones

Todas las llamadas a la api retornan statusCode distinto a partir del resultado.
Todos los statusCode posivos retornan un JSON de formato  `{"data":[...], "success:true/false"}`. Por lo que las llamadas pueden ser manipuladas en primera instancia por el statusCode y luego por el contenido del JSON.

Existen validaciones para no ejecutar consultas a la bd que predeterminadamente no darian resultados. Por ejemplo: validar si registro existe antes de eliminarlo (eliminar por id). Cada escenario va acompañado de su respectivo satusCode.
