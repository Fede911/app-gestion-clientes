import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';

import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { MilesPipe } from './pipes/miles.pipe';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    ListadoClientesComponent,
    AgregarClienteComponent,
    MilesPipe,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PaginationModule
  ],
  exports:[
    ListadoClientesComponent,
    AgregarClienteComponent, 
  ],
  providers: [PaginationConfig]
})
export class ClientesModule { }
