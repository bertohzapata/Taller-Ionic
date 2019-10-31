# Taller de Ionic y Angular

## Enlaces para el taller
-[Ionic dashboard](https://dashboard.ionicframework.com/)
-[Componentes Ionic](https://ionicframework.com/docs/components)
-[Configuración AngularFire3](https://github.com/angular/angularfire/blob/master/docs/ionic/v3.md)

##  Configuraciones previas

Antes de comenzar de debe tener instalado [Node js](https://nodejs.org/es/) (de preferencia la versión LTS). El editor de código [Visual Studio Code](https://code.visualstudio.com/) por último [Angular](https://angular.io/cli).

### Revisión de herramientas
Ejecuta los siguientes comandos para verificar que las herramientas estén correctamente instaladas.
  ```
npm --version
 ```
 ```
ng --version
 ```
## Instalación de Ionic

1- Instalación por medio del CLI (Command Line Interface)
```
npm install -g ionic
 ```

2- Instalación de Cordova
```
npm install -g cordova
 ```

### Frameworks compatibles y modo nativo
Ionic permite desarrollar tus aplicaciones con los conocimientos que ya tienes con diferentes herramientas como:
- Angular
- React

Por otro lado también es posible desarrollar aplicaciones con Ionic en un modo nativo con Javascript.

Primeros pasos
-
### Ionic Dashboard
Crea tu cuenta en Ionic Dashboar si quieres trabajar con tu celular mientras programas.

### Descargar Ionic DevApp
Solo si estás dentro de la misma red Wi-fi puedes descargar la aplicación Ionic DevApp para tu dispositivo móvil y visualizar tu aplicación simulada en tiempo real. Solo es una aproximación de tu producto final.


### Primera App en con Ionic
```
ionic start myApp tabs
```
Si te da la opción de seleccionar un Framework para trabajar, puedes seleccionar el que conozcas.

### Visualizar tu aplicación en el navegador (o DevApp)
Entra a la carpeta en el proyecto y ejecuta el comando para arrancar la aplicación.
**Si quieres visualizar la app en tu dispositivo móvil SALTA este paso.**
```
cd myApp
ionic serve
```
Con la aplicación DevApp instalada en tu teléfono puedes utilizar estos comandos para visualizar cambios en tiempo real.
- Entra a la carpeta del proyecto.
- Enlazar la app con Ionic Dashboard para su gestión.
```
cd myApp
ionic link
```
- Selecciona crear nueva aplicación dentro de Appflow.
- También selecciona el repositorio Ionic Appflow.

Configura por este comando las características de Cordova
```
ionic cordova prepare
```
Por último inicia la aplicación  con el comando:
```
ionic serve --devapp
```

Usando Componentes
-
### Componentes de Ionic
Entra y juega con los distintos [componentes](https://ionicframework.com/docs/components) que nos provee la documentación. Recuerda que funciona tanto para Android como iOS.





Desarrollando una aplicación
-
Documentación para conexión de [Ionic con Firebase](https://github.com/angular/angularfire/blob/master/docs/ionic/v3.md).
### Conectar con una base de datos Firebase
Al trabajar con Angular dentro de Ionic necesitaremos las mismas herramientas de conexión a base de datos como en un proyecto web de Angular.
```
npm install angularfire2 firebase promise-polyfill --save
```

Importar las siguientes configuraciones al archivo **app.module.ts**.
```
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
```
Justo debajo se incorpora la configuración de la base de datos a la cual nos conectaremos para esta aplicación.
```
export  const  firebaseConfig  = {
  apiKey:  "AIzaSyDSDkSkdTG9XQpLnxVpr3DVTa05BcrGwKo",  
  authDomain:  "d enuncias1-6dbea.firebaseapp.com",  
  databaseURL:  "https://denuncias1-6dbea.firebaseio.com",  
  projectId:  "denuncias1-6dbea",  
  storageBucket:  "denuncias1-6dbea.appspot.com",  
  messagingSenderId:  "656421692521",  
  appId:  "1:656421692521:web:b70036b262ead399bbaef8",  
  measurementId:  "G-X9WYYPLRS0"
};
```
En el apartado de **imports** de app.module.ts se agregan los elementos agregados anteriormente.
```
AngularFireModule.initializeApp(firebaseConfig),
AngularFireDatabaseModule,
AngularFireAuthModule
```

Par terminar con las configuraciones de la base de datos solo agregamos esta importación al apartado **providers**
```
AngularFireDatabase
```
### Desplegando información
En el archivo .ts de nuestro componente añadimos estas importaciones:
```
import { AngularFireDatabase } from  '@angular/fire/database';
import { Observable } from  'rxjs';
```

Creamos un objeto que contenga las denuncias
```
denuncias:  Observable<any[]>;
```
Y dentro del constructor llamamos los datos de nuestra base para llenar nuestro objeto.
```
constructor(afDB:  AngularFireDatabase) {
this.denuncias  =  afDB.list('denuncias').valueChanges();
}
```

Nota: Si marca **error** en Observable solo basta agregar las funciones reactivas.
```
npm install rxjs --save
```
Dentro de la etiqueta ion-content agregar una tarjeta con una estructura de ciclo
```
  <ion-card  *ngFor="let denuncia of denuncias | async">
  <ion-card-header>
  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
  <ion-card-title>Card Title</ion-card-title>
  </ion-card-header>
  <ion-card-content>
  Keep close to Nature's heart... and break clear away, once   in awhile,
and climb a mountain or spend a week in the woods. Wash your spirit clean.
  </ion-card-content>
</ion-card>
```
Modificar las etiquetas por medio de dobles llaves de inicio y cierre para indicar los campos del objeto

```
<ion-content>
<ion-card  class="welcome-card"  *ngFor="let denuncia of denuncias | async">
  <img  [src]="denuncia.imagen"  alt="" />
  <ion-card-header>
  <ion-card-title>{{denuncia.descripcion}}</ion-card-title>
  </ion-card-header>
  <ion-card-content>
  <p>{{denuncia.estado}}</p>
  <p>{{denuncia.fecha}}</p>
  </ion-card-content>
  </ion-card>
</ion-content>
```