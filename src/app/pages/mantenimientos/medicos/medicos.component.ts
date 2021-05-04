import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: []
})
export class MedicosComponent implements OnInit {

  constructor(private medicoServices:MedicoService,
              private busquedaService: BusquedasService) { }

  public cargando:boolean = true;
  public medicos:Medico[] = [];

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoServices.cargarMedicos()
      .subscribe( medicos => {
        this.cargando = false;
        this.medicos = medicos;
      })
  }

  buscarMedicos(termino:string){
    if (!termino) {
      return this.cargarMedicos();
    }
    this.busquedaService.buscar('medico', termino)
      .subscribe(resp => {
        this.medicos = resp;
      })
  }

  borrarMedico(medico:Medico){
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No hay vuelta atras!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoServices.borrarMedico(medico._id)
        .subscribe(
          resp => {
            this.cargarMedicos();
            Swal.fire(
              'Borrado',
              `Medico ${medico.nombre} ha sido borrado`,
              'success'
            )
          }
        )
        
      }
    })
    
  }

  

}
