import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Cliente } from 'src/app/core/entities/cliente.interface';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  //Inicializamos con algunos clientes
  cliente: Cliente[] = [
    {
      "id": 1, 
      "dni": 1280989, 
      "nombre": "Fede",
      "apellido": "Bigatton", 
      "email": "fede@fede.com",
      "f_nac": "12/12/1956",
      "telefono":  "343567890",
      "direccion": "Siempreviva 123"
    }, 
    {
      "id": 2, 
      "dni": 31445633, 
      "nombre": "Analia", 
      "apellido": "Rivero", 
      "email": "ana@lia.com.ar",
      "f_nac": "03/04/1998",
      "telefono":  "342123856",
      "direccion": "Palo Alto 7808"
    }, 
    {
      "id": 3, 
      "dni": 31124509, 
      "nombre": "Maria", 
      "apellido": "Becerra", 
      "email": "maria@becerra.com.ar",
      "f_nac": "13/10/1998",
      "telefono":  "341456789",
      "direccion": "Santa Fe 23"
    }, 
    {
      "id": 4, 
      "dni": 26408132, 
      "nombre": "Diego", 
      "apellido": "De la Vega", 
      "email": "diego@zorro.com.ar",
      "f_nac": "10/10/1957",
      "telefono":  "343112456",
      "direccion": "Monterrey 1"
    }

  ];
    
  constructor( private router: Router,) { }
  
  // Devuelve todos los clientes
  getClientes(): Observable<Cliente[]> {
    if ( !localStorage.getItem('clientes') ){
      console.log('No existe');
      localStorage.setItem('clientes', JSON.stringify(this.cliente));
    }
    // localStorage.setItem('clientes', JSON.stringify(this.cliente));
    return of(JSON.parse(localStorage.getItem('clientes') as string));  
  }

  //Obtiene Cliente por Id
  getClientePorId( id: number ): any {
     //Convertimos la variable del localStorage en JSON
     let clientes = JSON.parse(localStorage.getItem('clientes') as string);

     //Recorremos buscando el cliente que tenga el dni pasado
     for(let i = 0; i < clientes.length; i++) {
       if( clientes[i].id == id) {
          return clientes[i];
       }
     }

  }

  //Agrega cliente nuevo, si no existe su dni
  addCliente( cliente: Cliente ) {
    //Convertimos la variable del localStorage en JSON
    let clientes = JSON.parse(localStorage.getItem('clientes') as string);
    //Agregamos nuevo cliente
    //Asignamos num id si el cliente 
    //no tiene id => Modo Registracion
    if (cliente.id === 0){
      var id = clientes.length + 1;
    }else{
      id = cliente.id;
    }
    clientes.push({ 
      "id": id,
      "nombre": cliente.nombre,
      "apellido": cliente.apellido,
      "dni": cliente.dni,
      "email": cliente.email,
      "f_nac": cliente.f_nac,
      "telefono":  cliente.telefono,
      "direccion": cliente.direccion
    });
    console.log('clientes desde servicio: ', clientes)
    //Convertimos el array en string para guardarlo
    localStorage.setItem('clientes', JSON.stringify(clientes));

    console.log('el cliente nuevo es: ', cliente);
  }

  //Actualiza un cliente registrado
  updCliente( cliente: Cliente ) {
    this.delCliente(cliente.id);
    this.addCliente(cliente);
    console.log('el cliente editado es: ', cliente);
  }

  //Elimina cliente por dni
  delCliente( id: number) {
    //Convertimos la variable del localStorage en JSON
    let clientes = JSON.parse(localStorage.getItem('clientes') as string);

    //Recorremos buscando el cliente que tenga el dni pasado
    for(let i = 0; i < clientes.length; i++) {
      if( clientes[i].id == id) {
         clientes.splice(i, 1);
      }
    }
    //Volvemos a guardar la variable 'clientes' en el localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }
  
}