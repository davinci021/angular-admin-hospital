import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css'
  ]
})
export class ProgressComponent {

  progreso1 : number = 15;
  progreso2 : number = 25;
  progreso : number = 80;


  get getProgreso1() {
    return `${ this.progreso1 }%`
  }

  get getProgreso2() {
    return `${ this.progreso2 }%`
  }

  valorHijo(valor : number) {
    this.progreso1 = valor;
  }
}
