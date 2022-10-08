import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Usuario } from '../../core/entities/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _auth: string = '';

  // get auth(): string {
  //   return  this._auth;
  // }

  constructor() { }

  verificaAutenticacion(): Observable<boolean> {
    //Si no existe userName, el usuario no esta autenticado
    if (!localStorage.getItem('userName')) { 
      return of(false);
    }else{
      if (localStorage.getItem('userName')  === 'Admin'){
        console.log('Existe userNAme y es: ', localStorage.getItem('userName'));
        return of(true);
      }else{
        return of(false);
      }
    }
  }

  login(usuario: Usuario):Observable<boolean> {
    if (usuario.userName === 'Admin' && usuario.password === 'admin'){
      //Acceso Permitido
      localStorage.setItem('userName', usuario.userName );
      this._auth = localStorage.getItem('userName')! ;
      return of(true)  
    }else{
      return of(false); //Acceso No permitido
    }
  }

  logout() {
    localStorage.removeItem('userName');
    this._auth = '';
  }
}
