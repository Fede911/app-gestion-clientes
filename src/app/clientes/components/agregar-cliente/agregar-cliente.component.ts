import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common' 

import { Cliente } from 'src/app/core/entities/cliente.interface';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'tpFI-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styles: [
  ]
})
export class AgregarClienteComponent implements OnInit {

  clienteForm!: FormGroup;

  title: string = "Registración";
  btntext: string = "Agregar"
  idParam: boolean = false; 

  cliente: Cliente = { 
    "id": 0, 
    "dni": 0, 
    "nombre": "", 
    "apellido": "", 
    "email": "", 
    "f_nac": "", 
    "telefono": "", 
    "direccion": "" 
  };

  constructor( private fb: FormBuilder,
              private clientesService: ClientesService,
              private activatedRoute: ActivatedRoute,
              private router: Router ) { }

  ngOnInit(): void {
    
    //obtengo el id de la route para determinar modo
      this.activatedRoute.params.subscribe( ({ id }) => { 
        if (id === undefined){
          this.title = "Registración"
          this.clienteForm = this.initForm(); 
        }else{
          //Modo Edicion activo
          this.title = "Edición";
          this.btntext = "Editar";
          this.idParam = true;
          this.cliente = this.clientesService.getClientePorId( id ) ;
          this.clienteForm = this.initForm();
          this.convertirFecha(this.cliente.f_nac)
        }
      })
  }

  initForm(): FormGroup {
    return this.fb.group({
      id: (this.idParam)? this.cliente.id : 0,
      dni: 
        [(this.idParam)? this.cliente.dni : undefined, [Validators.required]], 
      nombre: 
        [(this.idParam)? this.cliente.nombre : '', [Validators.required, Validators.minLength(3)]],
      apellido: 
        [(this.idParam)? this.cliente.apellido : '', [Validators.required, Validators.minLength(3)]], 
        
      email: 
        [(this.idParam)? this.cliente.email : '', [Validators.required, Validators.email]], 
        
      f_nac: 
        [(this.idParam)? this.convertirFecha(this.cliente.f_nac) : '', [Validators.required]],
        
      telefono: 
       [(this.idParam)? this.cliente.telefono : '', [Validators.required, Validators.minLength(10)]],
        
      direccion: 
        [(this.idParam)? this.cliente.direccion : '', [Validators.required]],
        
    });
  }

  get id(){
    return this.clienteForm.get('id');
  }

  get dni() {
    return this.clienteForm.get('dni');
  }

  get nombre() {
    return this.clienteForm.get('nombre');
  }

  get apellido() {
    return this.clienteForm.get('apellido');
  }

  get email() {
    return this.clienteForm.get('email');
  }

  get f_nac() {
    return this.clienteForm.get('f_nac');
  }

  get telefono() {
    return this.clienteForm.get('telefono');
  }

  get direccion() {
    return this.clienteForm.get('direccion');
  }

  onSubmit( ) { 
 
    this.cliente = {
      id: this.clienteForm.value.id,
      dni: this.clienteForm.value.dni, 
      nombre: this.clienteForm.value.nombre, 
      apellido: this.clienteForm.value.apellido, 
      email: this.clienteForm.value.email, 
      f_nac: this.convertirFechaParaGuardar(this.clienteForm.value.f_nac), 
      telefono: this.clienteForm.value.telefono, 
      direccion: this.clienteForm.value.direccion
    };

    //
    if (this.idParam){
      //Modo Edicion
      this.clientesService.updCliente( this.cliente );    
    }else{
      //Modo Registracion
      this.clientesService.addCliente( this.cliente );
    }
    this.router.navigate(['/clientes']); 
    console.warn(this.clienteForm.value);
  }

  volver() {
    this.router.navigate(['/clientes']);
  }

  convertirFecha(fecha: string){
    const fechaSeparada = fecha.split('/');
    // formato Fecha Adaptada Mes, Dia, Año -> MM/dd/yyyy
    const fechaAdaptada = new Date(fechaSeparada[1]+'/'+fechaSeparada[0]+'/'+fechaSeparada[2]);
    const fechaConvertida = (formatDate(fechaAdaptada, 'yyyy-MM-dd', 'en'));  
    //console.log('Fecha separada:', fechaSeparada);
    //console.log('Fecha adap:', fechaAdaptada);
    //console.warn('Fecha Convertida: ', fechaConvertida)
    return fechaConvertida; 
  }

  convertirFechaParaGuardar(fecha: string){
    const fechaSeparada = fecha.split('-');
    // formato Fecha Adaptada Para Guardar  Dia, Mes, Año -> dd/MM/yyyy
    const fechaAdaptadaParaGuardar = fechaSeparada[2]+'/'+fechaSeparada[1]+'/'+fechaSeparada[0];
    console.log ('fechaGuardar: ',fechaAdaptadaParaGuardar);
    return fechaAdaptadaParaGuardar;
  }
}
