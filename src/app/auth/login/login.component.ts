import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {


  public auth2:any;
  public formSubmitted = true;
  

  constructor(private router : Router, 
              private     fb : FormBuilder,
              private usuarioServices:UsuarioService) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.formSubmitted = true;
    console.log(this.loginForm.value);

    //SI EL FORMULARIO DE INICIO DE SESION ES INVALIDO, ERROR
    if (this.loginForm.invalid) { return; }

    //ENVIAR EL FORMULARIO AL METODO LOGIN DEL SERVICIO
    this.usuarioServices.login(this.loginForm.value)
      .subscribe( (resp:any) => {
        console.log(resp.token);
        
        //GUARDAR EL TOKEN EN EL LOCALSTORAGE
        localStorage.setItem('token', resp.token);
        
        //SWEETALERT
        Swal.fire({
          icon: 'success',
          title: 'Inicio exitoso!',
          timer: 1000
        });

        //NAVEGAR AL DASHBOARD
        this.router.navigate(['/']);

      }, (err) =>{
        //SWEETALERT ERROR
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.msg,
          timer: 3000
        })
      })
  }

  public loginForm = this.fb.group({
    email: ['test5@gmail.com', [ Validators.email, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
    
  });

  campoNoValido(campo:string ) : boolean {

    if ( this.loginForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }
    
   /* onSuccess( googleUser:any ) {
      //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token);
    } 

    onFailure(error:any) {
      console.log(error);
    } */



    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark'
      });
    }

    starApp() {
        gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '112072798373-30o2e0sojoee7it2671mthpdfp437j62.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        this.attachSignin(document.getElementById('my-signin2'));
      });
    }

    attachSignin(element:any) {
      
      this.auth2.attachClickHandler(element, {},
          (googleUser:any) => {
            const id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token);
            
            this.usuarioServices.loginGoogle( id_token)
                  .subscribe(resp => {
                    this.router.navigateByUrl('/')
                  })

            

          }, (error:any) => {
            alert(JSON.stringify(error, undefined, 2));
          });
    }

}
