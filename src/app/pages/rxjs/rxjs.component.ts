import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, Subscribable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  subscription: Subscription;
  constructor() {

   this.subscription =  this.regresaObservable()
   /*  .pipe(
      retry(2) // Aqui falla 2 intentos en total 3. # de intentos
    ) */
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('La pag se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
          contador ++;

          const salida = {
            valor: contador
          };
          observer.next( salida ); // notifica que llega el evento
         /*  if ( contador === 3) {
            clearInterval(intervalo);
            observer.complete(); // Detener escucha del "observable" notifico evento de finalización
          }
          if ( contador === 2) {
            //   clearInterval(intervalo);
            observer.error('Auxilio!!');
          } */
        }, 1000 );
      }).pipe(
        map(resp =>  resp.valor ),
        filter((valor, index) => {console.log('filter', valor, index);
                                  return true;
      })
      );
  }

}
