import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from './../../services/file-upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  isReadOnlyEmail=true;
  isReadOnlyNombre=true;
  
  imgUrl = '';
  perfilForm! : FormGroup;
  imagenSubir!: File;
  usuario: Usuario;
  public imgTemp:any = null;

  constructor(private fb : FormBuilder,
              private usuarioService:UsuarioService,
              private fileUServices:FileUploadService
              ) 
  {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required ],
      email: [this.usuario.email, [Validators.required , Validators.email]]
    })
  }

  deshabilitar(valor:'nombre'|'email') {
    if (valor === 'email') {
      if (this.isReadOnlyEmail) {
        return this.isReadOnlyEmail = false;
      } else {
        return this.isReadOnlyEmail = true;
      }
    } else {
      if (this.isReadOnlyNombre) {
        return this.isReadOnlyNombre = false;
      } else {
        return this.isReadOnlyNombre = true;
      }
    }
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
        .subscribe( (resp:any) => {
          this.usuario = resp.usuario;
          this.imgUrl = resp.usuario.img;
          console.log(this.usuario);
          //this.usuario = resp.usuario;
          Swal.fire({
            title: 'Ok', icon: 'success', text: 'Usuario actualizado'
          })
        }, (err) => {
          Swal.fire(
            'Error', err.error.msg, 'error', 
          )
        });
  }

  cambiarImagen( event:any ) {
    
    const file = event.target.files[0];
    this.imagenSubir = file;
    if (!file ) { 
      return this.imgTemp = null; 
    }
    
    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

    return;
  
  }

  subirImagen() {
    console.log(this.imagenSubir);
    this.fileUServices.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid! )
    .then( img => (
        this.usuario.img = img,
        Swal.fire({
          title: 'Ok', icon: 'success', text: 'Imagen subida'
        })
      )).catch( err => {
        console.log(err);
        Swal.fire( 'Error', 'No se pudo subir la imagen', 'error' )
      })

      
  }

}
