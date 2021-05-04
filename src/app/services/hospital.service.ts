import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  //  PROPIEDADES  
  hospital = Hospital;

  //  CONSTRUCTOR 
  constructor(private http:HttpClient) { }
  
  //  GETTERS
  get token():string {
    return localStorage.getItem("token") || '';
  }

  get headers(){
    return {
      headers : {
        'x-token' : this.token
      }
    }
  }
  
  //  METODOS
  listarHospitales(){
    const url = `${ base_url }/hospitales`;
    return this.http.get<Hospital[]>(url, this.headers )
          .pipe(
            map( (resp:any) => resp.hospitales)
            //map( (resp: {ok: boolean, hospitales: Hospital[] }) => resp.hospitales)
          )
  }

  crearHospital(nombre:String){
    const url = `${ base_url }/hospitales`;
    return this.http.post( url, { nombre }, this.headers );
  }

  actualizarHospital(_id:string, nombre:string){
    const url = `${ base_url }/hospitales/${_id}`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarHospital(_id:String){
    const url = `${ base_url }/hospitales/${_id}`;
    return this.http.delete( url, this.headers );
  }
}
