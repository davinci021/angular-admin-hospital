import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent{

  public imgUrl = '';
  public usuario: Usuario;

  public correo = localStorage.getItem('email');
  public nombre = localStorage.getItem('nombre');
  public img = localStorage.getItem('imagen');
  
  
  constructor(private usuarioService: UsuarioService, private router:Router) { 
    this.usuario = usuarioService.usuario;
    this.imgUrl = this.usuario.imagenUrl;
    
  }
  
  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  busqueda(termino:string){
    console.log(termino);
  }



}
