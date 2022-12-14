
# SHARE LINK 🪢

_API que permite a los usuarios compartir enlaces web que consideran interesantes, después de realizar su registro en la aplicación, podrán compartir, ver y votar enlaces._

## Vamos ayá 🚀

_Las siguientes instrucciones te van a permitir obtener una copia del proyecto en tu máquina local para fines de desarrollo y pruebas._


### Requisitos 🚦

* Api multiplataforma soportada en Os Linux,windows 8,9,10,11 y mac.
* Api diseñada para conectarse a un base de datos SQL.
* Tener node previamente instalado.
* Compatible a partir de la version 7.0.2 node.
* Para comprobar si está instalado ejecutar el siguiente comando.

```
Node --version
```
_Para comprobar su versión, ejecutar el siguiente comando_

```
npm --version
```
_En el caso de no tener node instalado o en su versión compatible con la api te dejamos un enlace para realizar su instalación según tu sistema operativo_.
https://nodejs.org/es/download/


## Pre-instalación 🪛

_Crear una base de datos en tu mysql_

```
CREATE DATABASE nameDataBaseSql;
```
* Crear un documento raiz .env para conectar tus datos personales con la api, recuarda que en el documento .env.example estan todos los datos correspondientes para utilizar en tu nuevo documento .env

* Actuliza los datos del usuario admin en el documento initDb.js

* Crear una carperta de raiz llamada static dónde se guardarán las fotos de perfil actulizadas por cada usuario,recuerda guardar el nombre de la carpeta en el campo STATIC_FILE del documento .env.

* Para la interacción con el envio de email deberas tener una api key de algún gestor de email, en este caso hemos configurado la api con 'sengrid'
https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs

## Instalación 🛠

_Realiza los siguientes pasos:_

```
npm install
```
```
node .db./initDB.js
```
```
npm run dev
```
Este ultimo comando lo debereas ejecutar en caso de estar probando la api en modo desarrollo, en caso contrario un simple...

```
npm start
```
será sufciente para poner en marcha nuestro puerto de escucha.

_Ahora deberás ver en tu consola un aviso del puerto en el cual se está realizando la escucha._

# EJECUCIÓN DE PRUEBAS 📝

_Puedes utilzar la plataforma cliente que más te guste, en esta api hemos incluido en la carpeta doc, las solicitudes necesarias para realizar las pruebas en esta api, puedes importarlas desdede post-man y realizar tus pruebas._

## Post-man 👨🏼‍🚀
* Deberas instalar la plataforma de postman en tu máquina local.
https://www.postman.com/downloads/
* Importar la colección a post-man desde la api.
* Configurar el puerto y el token en el apartado 'envoirement' de post-man (parte superior derecha).
* El token se obtiene por cada usuario que ejecute un login en la api.

## Herramientas. ⚙️
* [Node](https://nodejs.org/es/docs/) - Run time usado.
* [Express](http://expressjs.com/es/) - Entorno de trabajon usado.
* [Morgan](https://www.npmjs.com/package/morgan) - Middleware.
* [Express-json](https://www.npmjs.com/package/express-json) - Middleware.
* [Hogan.js](https://www.npmjs.com/package/hogan.js/v/3.0.2) - Compilador.
* [Mysql2](https://www.npmjs.com/package/mysql2) - Base de datos.
* [Sharp](https://www.npmjs.com/package/sharp) - Convertidor formato imágenes.
* [Crypto-js](https://www.npmjs.com/package/crypto-js) - Encapsulamiento.
* [Sengrid](https://www.npmjs.com/package/@sendgrid/mail) - Interacción con email.
* [joi](https://www.npmjs.com/package/joi) - data validator.

### Nota 🗒
_Las herramientas utilizadas se instalaran previamente al ejecutar el comando anteriormente mencionado_
```
npm install
```
_No hará falta realizar ninguna otra instalación de paquetes_

## Autores ✒️
* **Gregorio Visiedo**  [🧔🏽Goyo](https://github.com/gvisiedo).
* **Leonardo** [👨🏽‍🦱Leo](https://github.com/Lenard743).
* **Yaneth Quintero** [👱🏽‍♀️Yaneth](https://github.com/tenayquintero).


## Agradecimientos 🎁
_En especial a Stefano💗 que nos guio para sacar adelante la api_

































