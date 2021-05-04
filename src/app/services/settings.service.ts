import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTema = document.querySelector('#theme');

  constructor() { 
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTema?.setAttribute('href', url);
  }

  changeTheme(theme: string){

    const url = `./assets/css/colors/${ theme }.css`
    this.linkTema?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();

  }

  //CAMBIAR SELECTOR
  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');

    links.forEach( elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTema?.getAttribute('href');

      if ( btnThemeUrl === currentTheme ) {
        //añadir a id=thema la clase 'working'
        elem.classList.add('working');
      }
    });
  }
}
