import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu(){
    return this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
  /* menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/'},
        { titulo: 'Progreso', url: 'progress'},
        { titulo: 'Gráficas', url: 'grafica1'},
        { titulo: 'Perfil', url: 'perfil'},
      ]

    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios'},
        { titulo: 'Hospitales', url: 'hospitales'},
        { titulo: 'Medicos', url: 'medicos'},
      ]

    }
  ]; */

  constructor() { }
}
