import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from 'src/app/core/entities/cliente.interface';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'tpFI-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styles: [
  ]
})
export class ListadoClientesComponent implements OnInit {

  clientes!: Cliente[];
 
  constructor( private clientesService: ClientesService,
               private router: Router ) { }

  

  ngOnInit(): void {
    this.clientesService.getClientes()
    .subscribe ( clientes => this.clientes = clientes);
  }

  //Activa edicion de datos de cliente
  editarCliente( cliente: Cliente ): void {
    console.log("Editando el cliente: ", cliente );
    this.clientesService.updCliente( cliente );
    this.router.navigate(['clientes/editar-cliente', cliente.id]);
  }

  //Elimina un cliente por Id
  eliminarCliente( id: number ):void {
    this.clientesService.delCliente( id );
    console.log('Ha eliminado al cliente con Id: ', id )
    //Refrescamos el listado luego de eliminar el cliente
    this.clientesService.getClientes()
    .subscribe ( clientes => this.clientes = clientes);
    this.router.navigate(['clientes/listado-clientes']);
  }

}
