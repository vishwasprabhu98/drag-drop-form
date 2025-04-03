import { Routes } from '@angular/router';
import { ViewFormComponent } from './pages/view-all-form/view-form.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { FillFormComponent } from './pages/fill-form/fill-form.component';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard, userGuard } from './core/guards/route-guards/route.guard';

export const routes: Routes = [
  {
    path: 'view-forms',
    canActivate: [userGuard],
    component: ViewFormComponent
  },
  {
    path: 'build-form',
    canActivate: [adminGuard],
    component: CreateFormComponent
  },
  {
    path: 'fill-form',
    canActivate: [userGuard],
    component: FillFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
