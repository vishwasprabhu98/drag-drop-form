import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard, userGuard } from './core/guards/route-guards/route.guard';

export const routes: Routes = [
  {
    path: 'view-forms',
    canActivate: [userGuard],
    loadComponent: () => import('./pages/view-all-form/view-form.component').then(c => c.ViewFormComponent)
  },
  {
    path: 'build-form',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/create-form/create-form.component').then(c => c.CreateFormComponent)

  },
  {
    path: 'fill-form',
    canActivate: [userGuard],
    loadComponent: () => import('./pages/fill-form/fill-form.component').then(c => c.FillFormComponent)
    
  },
  {
    path: 'submissions',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/view-submissions/view-submissions.component').then(c => c.ViewSubmissionsComponent)
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
