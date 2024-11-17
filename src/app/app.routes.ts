import { Routes } from '@angular/router';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ModelDrivenFormComponent } from './model-driven-form/model-driven-form.component';

export const routes: Routes = [
  { path: 'template-form', component: TemplateDrivenFormComponent },
  { path: 'model-form', component: ModelDrivenFormComponent },
  { path: '', redirectTo: 'template-form', pathMatch: 'full' }
];
