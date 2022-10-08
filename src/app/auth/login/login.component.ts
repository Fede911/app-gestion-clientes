import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/entities/usuario.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'tpFI-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = { 'userName': '', 'password': ''};
  error : boolean = false;

  constructor(  private router: Router,
                private authService: AuthService ) { }

  ngOnInit(): void {
    this.error = false;
  }

  onSubmit( usuario: Usuario){
    console.log(usuario)
    this.authService.login( usuario )
      .subscribe( resp => {
        (resp)? this.router.navigate(['./clientes']) : this.error = true;
      })
  }


}
