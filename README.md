# FormularioAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Dscripción

Proyecto para la escuela mostrando el uso básico de formlarios model driven  y template driven. Así como cómo configurar el cliente HTTP para enviar datos a una API RESTful simulada.


El programa requiee la instalación de algúna exensión como CORS Unblock ya que las politicas de seguridad  no permiten que se haan petriciones sin los enlaces de autorización
## Proceso del proyecto:

Empezamos creando un nuevo proyecto. Después de crear el folder abrimos una ventana en nuestra terminal CLI y utilizamos los siguientes comandos

ng new formulario-angular

el cual creará el folder de nuestro proyecto. Después cambiamos de directorio entrando a ese folder y entramos al siguiente comando, el cual importará el módulo para realizar peticiones HTTP.

ng generate service api

luego los comando para generar los formularios de componentes y servicios:

ng generate component template-driven-form 
ng generate component model-driven-form

Después procedemos a crear el formulario template.





<form #registerForm="ngForm" (ngSubmit)="onSubmit(registerForm)">
   <label>Nombre:</label>
   <input type="text" name="name" [(ngModel)]="user.name" required />
    <label>Email:</label>
   <input type="email" name="email" [(ngModel)]="user.email" required />
    <label>Contraseña:</label>
   <input type="password" name="password" [(ngModel)]="user.password" required />
    <button type="submit">Registrarse</button>
 </form>



pasamos a escribir nuestro código en el archivo typescript



import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
 selector: 'app-template-driven-form',
 standalone: true,
 imports: [FormsModule],
 templateUrl: './template-driven-form.component.html',
 styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent {
 user = {
   name: '',
   email: '',
   password: ''
 };


 constructor(private apiService: ApiService) {}


 onSubmit(form: NgForm) {
   if (form.valid) {
     this.apiService.sendData(form.value).subscribe(
       (response) => {
         console.log('Respuesta exitosa:', response);
       },
       (error) => {
         console.error('Error:', error);
       }
     );
   }
 }
}







Y repetimos básicamente lo mismo para formular el modelo driven. empezando con el formulario HTML


<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
   <label>Nombre:</label>
   <input type="text" formControlName="name" />
    <label>Email:</label>
   <input type="email" formControlName="email" />
    <label>Contraseña:</label>
   <input type="password" formControlName="password" />
    <button type="submit" [disabled]="registerForm.invalid">Registrarse</button>
 </form>
 
 







Y después con el Typescript:



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
 selector: 'app-model-driven-form',
 standalone: true,
 imports: [ReactiveFormsModule],
 templateUrl: './model-driven-form.component.html',
 styleUrls: ['./model-driven-form.component.css']
})
export class ModelDrivenFormComponent implements OnInit {
 registerForm!: FormGroup;


 constructor(private fb: FormBuilder, private apiService: ApiService) {}


 ngOnInit() {
   this.registerForm = this.fb.group({
     name: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     password: ['', Validators.required]
   });
 }


 onSubmit() {
   if (this.registerForm.valid) {
     this.apiService.sendData(this.registerForm.value).subscribe(
       (response) => {
         console.log('Respuesta exitosa:', response);
       },
       (error) => {
         console.error('Error:', error);
       }
     );
   }
 }
}






Ahora, como creamos un API, nos tenemos que asegurar de que importen las respuestas HTTP:





import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
 providedIn: 'root'
})
export class ApiService {
 private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // URL de prueba


 constructor(private http: HttpClient) {}


 sendData(data: any): Observable<any> {
   return this.http.post(this.apiUrl, data);
 }
}






Tambien, en app.componens.ts:



import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@Component({
 selector: 'app-root',
 standalone: true,
 imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
 templateUrl: './app.component.html',
 styleUrl: './app.component.css'
})
export class AppComponent {
 title = 'formulario-angular';
}





También necesitamos especificar las rutas:



import { Routes } from '@angular/router';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ModelDrivenFormComponent } from './model-driven-form/model-driven-form.component';


export const routes: Routes = [
 { path: 'template-form', component: TemplateDrivenFormComponent },
 { path: 'model-form', component: ModelDrivenFormComponent },
 { path: '', redirectTo: 'template-form', pathMatch: 'full' }
];





Y por último necesitamos importar las rutas a main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {
 providers: [provideRouter(routes), provideHttpClient()]
});








## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
