import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadoClientesComponent } from './clientes/components/listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './clientes/components/agregar-cliente/agregar-cliente.component';
import { LoginComponent } from './auth/login/login.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesModule ), 
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
