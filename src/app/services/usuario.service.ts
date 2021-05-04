import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm, LoginForm } from '../interfaces/registerFrom.interfaces';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { ActualizarUserForm, CargarUsuarios } from './../interfaces/registerFrom.interfaces';





const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;
  public auth2: any;

  constructor(private http:HttpClient) { }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('img');
    localStorage.removeItem('menu');
  }

  //GETTER
  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token' : this.token
      }
    }
  }

  get role() : 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }
  
  get uid():string {
    return this.usuario.uid || '';
  }

  guardarLocalStorage( token:string, menu:any){
    localStorage.setItem('token', token );
    localStorage.setItem('menu',JSON.stringify(menu) );
  }
  
  validarToken():Observable<boolean> {
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token' : this.token
      },
    }).pipe(
      map( (resp:any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
        const { nombre, email, google, img = '', role, uid } = resp.usuarioDB;
        this.usuario = new Usuario(nombre, email, '', img, google, 
                                    role, uid);
        return true;
      }), 
      catchError( error => of(false))
    ); 
  }

  crearUsuario(formData: LoginForm){  
    return this.http.post(`${ base_url }/usuarios`, formData)
                .pipe(tap( (resp:any) => {
                  this.guardarLocalStorage(resp.token, resp.menu);
                }))
  }

  actualizarUsuario(formData: ActualizarUserForm){
    const { ...campos } = formData;
      campos.role = this.usuario.role!;
      return this.http.put(`${ base_url }/usuarios/${ this.usuario.uid }`, campos, {
        headers: {
          'x-token' : this.token
        }
      })
  }

  actualizarRole(usuario:Usuario){
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers)
        .subscribe(resp => console.log(resp));
  }

  login( formData:RegisterForm ){
    return this.http.post(`${ base_url }/login`, formData)
      .pipe(tap((resp:any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      }))
  }

  loginGoogle(token:any) {
    return this.http.post(`${ base_url }/login/google`, { token })
              .pipe(
                tap( (resp:any) => {
                  localStorage.setItem('token', resp.token);
                })
              )
  }

  eliminarUsuario(usuario: Usuario){
    const url = `${ base_url }/usuarios/${usuario.uid}`;
    console.log(url);
    this.http.delete( url, this.headers ).subscribe(resp=>{console.log(resp);})
      /* .pipe(map( (resp) => {
        console.log(resp);
        this.guardarLocalStorage(resp.token, resp.menu);
      })) */
  }

  cargarUsuarios(desde: number = 0){
    const url = `${ base_url }/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers )
        .pipe(
          delay(100),
          map(  resp => {
            const usuario = resp.usuario.map(
              user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
            );
              return {
                total: resp.total,
                usuario
              };
          })
        )
  }
  
}
