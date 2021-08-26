import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CarritoService } from '../../services/carrito.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'pedidos-carrito-resumen',
  templateUrl: './carrito-resumen.component.html',
  styles: [
  ]
})
export class CarritoResumenComponent implements OnInit, OnDestroy  {

  endSubs$: Subject<any> = new Subject();
  precioTotal!: number;
  esCheckout = false;
  constructor(
    private router: Router,
    private carritoService: CarritoService,
    private pedidosService: PedidosService
  ) {
    this.router.url.includes('checkout') ? (this.esCheckout = true) : (this.esCheckout = false);
  }

  ngOnInit(): void {
    this._getPedidoResumen();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  _getPedidoResumen() {
    this.carritoService.carrito$.pipe(takeUntil(this.endSubs$)).subscribe((carrito) => {
      this.precioTotal = 0;
      if (carrito) {
        carrito.items!.map((item) => {
          this.pedidosService
            .getProducto(item.productoId!)
            .pipe(take(1))
            .subscribe((producto) => {
              this.precioTotal += producto.precio * item.cantidad!;
            });
        });
      }
    });
  }

  irACheckout() {
    this.router.navigate(['/checkout']);
  }
}
