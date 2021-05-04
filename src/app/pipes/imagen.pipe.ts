import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,tipo: 'usuarios'|'medicos'|'hospitales'): string {
    if (!img ) {
        return `${ base_url }/uploads/usuarios/no-image`;
    }
    if (img?.includes('https')) {
        return img;
    }
    // /uploads/usuarios/no-image
    if ( img ) {
        return `${ base_url }/uploads/${ tipo }/${ img }`;
    } else {
        return `${ base_url }/uploads/${ tipo }/no-image }`;
    };
  
  
  
  }

}
