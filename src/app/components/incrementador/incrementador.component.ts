import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 20;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();;


  get getPorcentaje() {
    return `${ this.progreso }%`
  }

  cambiarValor(valor:number): void{
    if (this.progreso >= 95 && valor >= 0) {
      this.valorSalida.emit(95);
      
      this.progreso = 95;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(95);
      this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange( valor : number ) {
    if (valor >= 100 ) {
      this.progreso = 100;
    }else if (valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }

    this.valorSalida.emit( this.progreso );
  }
}
