import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioServices: UsuarioService,
                      private busquedasServices: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioServices.cargarUsuarios(this.desde)
    .subscribe( ({ total, usuario }) => {
      this.totalUsuarios = total;
      this.cargando = false;
      if (usuario.length !== 0) {
        this.usuarios = usuario;
        
      }
    });
  }

  borrarUsuario(usuario:Usuario){
    if (usuario.uid === this.usuarioServices.uid) {
      return Swal.fire('Error','No puede borrarse a si mismo.','error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo.'
    }).then((result:any)=> {
      if (result.value) {
        this.usuarioServices.eliminarUsuario(usuario);
        return this.cargarUsuarios();
      }
    });
    return false;
  }

  cambiarRol(usuario:Usuario){
    this.usuarioServices.actualizarRole(usuario);
  }

  cambiarPagina(valor:number){
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino:string){
    
    if (termino) {
      this.busquedasServices.buscar("usuario", termino)!
      .subscribe( (resp:Usuario[]) => {
        this.usuarios = resp
      });
    } else {
      this.cargarUsuarios()
    }
  }

}
