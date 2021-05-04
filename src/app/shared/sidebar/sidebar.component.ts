import { Component, OnInit } from '@angular/core';
import { SidebarService } from './../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItem: any[];
  usuario!: Usuario;
  img='';
  constructor(private sidebarService : SidebarService, private usuarioServices:UsuarioService) { 
    this.menuItem = sidebarService.cargarMenu();
    this.usuario = usuarioServices.usuario;
    this.img = this.usuario.imagenUrl;
    console.log(this.usuarioServices.usuario);
  }

  ngOnInit(): void {
    //console.log(this.menuItem);
  }

  

  
}
