import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'listado-clientes', component: ListadoClientesComponent,
      },
      {
        path: 'registrar-cliente', component: AgregarClienteComponent
      },
      {
        path: 'editar-cliente/:id', component: AgregarClienteComponent
      },
      {
        path: '**', redirectTo: 'listado-clientes'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [ RouterModule ]
})
export class ClientesRoutingModule { }
