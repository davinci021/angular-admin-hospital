import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit {

  inputNombre = false;
  hospitales : Hospital[] = [];
  cargando: boolean = true;

  constructor(private hospitalService:HospitalService,
              private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  habilitar(){
    if (this.inputNombre) {
      this.inputNombre = false;
    } else {
      this.inputNombre = true;
    }
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.listarHospitales()
    .subscribe( (resp:any) => {
      this.hospitales = resp;
      this.cargando = false;
    })
  }

  guardarCambios(hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre)
        .subscribe( resp => {
          Swal.fire('Actualizado' , hospital.nombre, 'success')
        })
  }

  eliminarHospital(hospital:Hospital){

    Swal.fire({
      title: '¿Estas seguro?',
      text: "No hay vuelta atras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital(hospital._id!)
          .subscribe( resp => {
            this.cargarHospitales();
            Swal.fire('Eliminado', hospital.nombre, 'success')
          });
      }
    })
  }

  async agregarHospital(){
    const { value } = await Swal.fire<string>({
      input: 'text',
      inputLabel: 'Crear hospital',
      text: 'Ingrese nombre hospital',
      inputPlaceholder: 'Nombre hospital',
      showCancelButton: true,
      
    })

    if (value) {
      this.hospitalService.crearHospital(value!)
          .subscribe( resp => {
            this.cargarHospitales();
            console.log(resp);
          })
      
    }
  }

  buscar(termino:string){

    if (termino) {
      this.busquedaService.buscar("hospital", termino)!
      .subscribe( resp => {
        this.hospitales = resp;
        
      });
    } else {
      this.cargarHospitales()
    }
  }

}
