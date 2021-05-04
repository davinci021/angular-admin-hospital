import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { pipe } from 'rxjs';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  public usuario!: Usuario;

  constructor(private http : HttpClient) {
  }

  get token () : string {
    return localStorage.getItem('token') || '';
  }

  get headers () {
    return {
      headers: {
        'x-token' : this.token
      }
    }
  }

  private transformarUsuarios(resultados:any[]) : Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  private transformarHospitales(resultados:any[]) : Hospital[] {
    return resultados;
  }

  private transformarMedicos(resultados:any[]) : Medico[] {
    return resultados;
  }

  buscar (tipo:'usuario'|'medico'|'hospital', termino:string) {
    const url = `${ base_url }/collection/${ tipo }/${ termino }`;
    return this.http.get<any[]>(url, this.headers )
      .pipe(
        map( (resp:any ) => {
          switch (tipo) {
            case 'usuario':
              return this.transformarUsuarios( resp.resultado)
            case 'hospital':
              return this.transformarHospitales( resp.resultado)
            case 'medico':
              return this.transformarMedicos( resp.resultado )
            default:
              return [];
          }
        })
      )
    /* switch (tipo) {
      case 'usuario':
        return this.http.get<Usuario[]>(url, this.headers )
                .pipe(
                  //map( (resp:any) => resp.resultado ))
                  map( (resp:any) => {
                    if (resp) {
                      
                    }
                    const usuario = resp.resultado.map(
                      (user:Usuario) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
                    ); 
                    return {
                      usuario
                    }
                  })
                )
      case 'hospital':
        return this.http.get<Hospital>(url, this.headers )
                  .pipe(
                    map( (resp:any) => {
                      const hospital = resp.resultado.map(
                        (hosp:Hospital) => new Hospital(hosp.nombre, hosp._id, hosp.usuario, hosp.img)
                      )
                      return {
                        hospital
                      }
                    })
                  )
      default:
        return false;
    } */
  }
}
