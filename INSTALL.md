# Proyecto Base Backend

Despues de ejecutar las instrucciones para instalar el gestor de base de datos `postgres` descritos paso a paso en el archivo ([SERVER.md](SERVER.md)).

#### Pasos para instalar GIT

- Para sistemas basados en UNIX
> Revisar como se realiza la instalacion y configuracion en ([SERVER.md](SERVER.md))

Despues de tener lo basico necesitamos instalar nuestra aplicación

#### Creación de la Base de Datos
Se debe crear la base de datos para la ejecución del backend, para ello conectarse con el siguiente comando:
```sh
$ psql -U postgres -h localhost
psql (9.5.4)
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

postgres=#
```
Crear un usuario que adiministre la base de datos del sistema:
```sh
postgres=# CREATE USER user_backend_base WITH PASSWORD 'user_backend_base';
CREATE ROLE
```
Para verificar que el usuario se creo correctamente:
```sh
postgres=# \du
Role name   |                         Attributes                         | Member of
---------------+------------------------------------------------------------+-----------
postgres      | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
user_backend_base |                                                            | {}

```

Luego creamos la base de datos:
```sh
postgres=# CREATE DATABASE backend_base_db WITH OWNER user_backend_base;
CREATE DATABASE
```
Para verificar que la base de datos se creo correctamente:
```sh
postgres=# \l
                                        List of databases
Name           |     Owner     | Encoding |   Collate   |    Ctype    |   Access privileges   
--------------------------+---------------+----------+-------------+-------------+-----------------------

backend_base_db              | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 |


template0                | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
|               |          |             |             | postgres=CTc/postgres
template1                | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
|               |          |             |             | postgres=CTc/postgres
(1 rows)

```
Asignamos todos los privilegios al usuario creado:
```sh
postgres=# GRANT ALL PRIVILEGES ON DATABASE backend_base_db to user_backend_base;
GRANT
```
Para verificar esta asignación de privilegios:
```sh
postgres=# \l
                                      List of databases
Name           |     Owner     | Encoding |   Collate   |    Ctype    |        Access privileges        
--------------------------+---------------+----------+-------------+-------------+---------------------------------

backend_base_db | user_backend_base | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =Tc/user_backend_base              +
|               |          |             |             | user_backend_base=CTc/user_backend_base
template0                | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres                    +
|               |          |             |             | postgres=CTc/postgres
template1                | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres                    +
|               |          |             |             | postgres=CTc/postgres
(1 rows)

```

Para eliminar la base de datos creada o el usuario se digitan estas lineas de codigo en la terminal abierta de postgres
```sh
postgres=# DROP DATABASE backend_base_db;
DROP DATABASE

```
```sh
postgres=# DROP USER user_backend_base;
DROP ROLE

```
Para salir de la consola de postgres

> **CTRL** + **d**


#### Instalación

Para instalar el proyecto debemos clonarlo desde nuestro repositorio:

```sh
$ git clone https://github.com/GladysBravo/examen-frontend.git
```

Ingresar a la carpeta:
```sh
$ cd backend_base-sisnodi-backend
```
Podemos verificar que estamos en el branch master:

```
$ git status
```
Nos devolverá:
```
On branch master
```
(Opcional) Si necesitamos trabajar un branch específico (en este ejemplo, el nombre del branch es `branch_copia_master`) ejecutamos:

```
$ git checkout branch_copia_master
```

Al volver a verificar con git status:
```
$ git status
```

Se obtiene como respuesta que el proyecto se sitúa en el branch elegido:
```
On branch branch_copia_master
```

Para instalar la aplicación, se tienen las siguientes opciones:

###### Instalar dependencias del proyecto

Ejecutar el comando npm install que instalará todas las dependencias que el proyecto necesita:
```
$ npm install
```

#### Archivos de Configuración

Para modificar los datos de conexion a la base de datos y para modificar el puerto de conexion de **desarrollo** realizar una copia del archivo `src/config/config.environment.js.sample` y cambiar los datos de conexión a la base de datos respectiva, el archivo debería ser nombrado de la siguiente manera:

- `src/config/config.development.js`

Para modificar los datos de conexion a la base de datos y para modificar el puerto de conexion de **test** realizar una copia del archivo `src/config/config.environment.js.sample` y cambiar los datos de conexión a la base de datos respectiva, el archivo debería ser nombrado de la siguiente manera:

- `src/config/config.test.js`

En ambos casos, es importante cambiar lo siguiente:
- `username - nombre de usuario de la base de datos`
- `password - contraseña del usuario de la base de datos`
- `database - nombre de la base de datos`
- `host - servidor donde se encuentra la base de datos`
- `demás variables`

#### Configuración del entorno

Para configurar la conexión a la base de datos de los seeders y migraciones debemos realizar una copia del archivo `config/config.js.sample` y renombrarlo bajo el nombre `config/config.js` con los datos necesarios para la conexión a la base de datos (este archivo es utilizado para los seeders y las migraciones).

Para configurar variables del sistema se debe realizar una copia del archivo `config/app.json.sample` y renombrarlo bajo el nombre de `config/app.json`.
Para el archivo `config/app.json` se pueden realizar la siguientes configuraciones:

- Modificar la configuración de los servicios, modificar según el ambiente en el que se vaya a levantar la aplicación (development, test, production).

## Iniciar la aplicación

Las opciones de ejecución son las siguientes:
+ Genera o regenera las tablas necesarias en la base de datos y ejecuta los seeders y migrations.
```
$ npm run setup
```

+ Levanta el sistema en modo developer, se reinicia en cada cambio realizado en los archivos..
```
$ npm run startdev
```
+ Levanta el sistema en modo normal
```
$ npm run start
```
+ Ejecuta el eslint para verificar el estandar de programacion, actualmente esta basado en: [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript).
```
$ npm run lint
```
+ Genera la documentacion del sistema
```
$ npm run apidoc
```
