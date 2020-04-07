import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress')  txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter(); // Emitir numero como un evento

  constructor() {
    // console.log(' Leyenda ', this.leyenda);
    // console.log(' progreso ', this.progreso);
   }

  ngOnInit(): void {
    // console.log(' Leyenda ', this.leyenda);
  }

  onChange( newValue: number ) {
    // let elemHTML: any = document.getElementsByName('progreso')[0];
    // console.log( elemHTML.value);
    if (newValue >= 100) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = this.progreso; // Number() --> para castear
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.value = this.progreso;
  }

  cambiarValor( valor: number ) {
    console.log(' Entro2 ');

    if (this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();
  }

}
