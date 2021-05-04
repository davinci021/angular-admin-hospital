import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = true;

  public registerForm = this.fb.group({
    nombre: ['test5', [ Validators.required, Validators.minLength(5) ]],
    email: ['test5@gmail.com', [ Validators.email, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
    password2: ['123456', [ Validators.required, Validators.minLength(6) ]],
    terminos: [false, [ Validators.required ]],
  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private router: Router, 
              private fb: FormBuilder, 
              private usuarioService:UsuarioService) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log( this.registerForm.value ); 
    
    if ( this.registerForm.invalid ) {
      return;
    }

    //realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value )
      .subscribe( resp => {
        console.log('Usuario creado');
        console.log(resp);
        
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado.',
          text: 'Seras redirigido para que inicies tu cuenta.',
          timer: 3000
        }), setTimeout(()=>{
          
          this.router.navigate(['/auth/login']);
        },3000)
        

      }, (err) => {
        //SWEETALERT
        Swal.fire({
          icon: 'error',
          title: 'Se ha producido un error.',
          text: err.error.msg,
          timer: 3000
        })
        //FIN SWEETALERT
      })
      

  }

  campoNoValido(campo:string ) : boolean {

    if ( this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted
  }

  contrasenaNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name:string, pass2Name:string) {
    return ( formGroup : FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control!.value === pass2Control!.value) {
        pass2Control!.setErrors(null)
      } else {
        pass2Control!.setErrors({ noEsIgual: true })
      }
    }
             
  }

}
