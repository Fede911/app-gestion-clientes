import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/core/entities/usuario.interface';

@Component({
  selector: 'tpFI-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  get usuario(): string {
    return localStorage.getItem('userName')!;
  }

  constructor( private route: Router, 
                private authService: AuthService) { }

  ngOnInit( ): void {
  }

  logout(): void {
    this.authService.logout(); 
    this.route.navigate(['./auth/login']);
  }

}
