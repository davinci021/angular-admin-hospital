import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: []
})
export class MedicoComponent implements OnInit {

  public medicoForm:FormGroup;
  public hospitales:Hospital[] = [];
  public medicoSeleccionado:Medico;
  public hospitalSeleccionado:Hospital;

  constructor(private fb:FormBuilder,
              private hospitalService:HospitalService,
              private medicoService:MedicoService,
              private router:Router,
              private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.activateRoute.params
      .subscribe(({id}) => { this.cargarMedicoId(id) });
    //this.medicoService.obtenerMedicoId()

    this.medicoForm = this.fb.group({
      nombre : ['', Validators.required ],
      hospital : ['', Validators.required ]
    });

    //Para escuchar los cambios de un atributo de un formControl
    this.medicoForm.get('hospital').valueChanges
        .subscribe( hospitalId => {
          this.hospitalSeleccionado = this.hospitales
            .find( h => h._id === hospitalId);
        })
  }

  cargarHospitales(){
    this.hospitalService.listarHospitales()
      .subscribe( (hospitales:Hospital[]) => {
        this.hospitales = hospitales;
      })
  }

  cargarMedicoId(id:string){
    if (id === 'nuevo') {
      return;
    }
    this.medicoService.obtenerMedicoId(id)
      .pipe(delay(100))
      .subscribe(medico => {
        if (!medico) {
          this.router.navigateByUrl(`/dashboard/medicos`);
        }
        //Desectructurar medico, obteniendo nombre Medico y id del Hospital
        const { nombre, hospital:{ _id } } = medico;
        this.medicoSeleccionado = medico;
        //Guardar atributos en formGroup
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }

  guardarMedico(){
    const { nombre } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      // Actualizar medico
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe( (resp) => {
          Swal.fire('Actualizado', `${ nombre } modificado correctamente`, 'success');
        });
    } else {
      // Crear medico
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe( (resp:any) => {
          console.log(resp);
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');  
          this.router.navigateByUrl( `/dashboard/medicos/${resp.medico._id}`);
        })
    }
  }

}
