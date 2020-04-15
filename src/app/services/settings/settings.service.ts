import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {

    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    // console.log('Guardado en el localStorage');
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes')) {
      // console.log('Cargado en el localStorage');
      this.ajustes = JSON.parse(localStorage.getItem('ajustes')); // convierto la data a JSON para ser correct/ almace nada en ajustes

      this.aplicarTema(this.ajustes.tema);
    } else {
      // console.log('NO DATA EN EL LOCALSTORAGE: usamos valores por default');
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string) {

    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }

}

// Restringirme qe tipo de info necesito en los ajustes.
interface Ajustes {
  temaUrl: string;
  tema: string;
}
