import { Routes } from '@angular/router';
import { ViewFormComponent } from './pages/view-all-form/view-form.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { FillFormComponent } from './pages/fill-form/fill-form.component';

export const routes: Routes = [
  {
    path: 'view-forms',
    component: ViewFormComponent
  },
  {
    path: 'build-form',
    component: CreateFormComponent
  },
  {
    path: 'fill-form',
    component: FillFormComponent
  }
];
