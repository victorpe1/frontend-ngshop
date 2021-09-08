import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '@bluebits/usuarios';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarritoItemDetallado} from '../../models/carrito';
import { CarritoService } from '../../services/carrito.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'pedidos-carrito-checkout',
  templateUrl: './carrito-checkout.component.html',
  styles: [
  ]
})
export class CarritoCheckoutComponent implements OnInit, OnDestroy  {

  carritoItemDetallado: CarritoItemDetallado[]=[];
  carritoCont = 0;
  endSubs$: Subject<any> = new Subject();



  constructor(
    private router: Router,
    private carritoService: CarritoService,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    this._getCarritoDetalle();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getCarritoDetalle() {
    this.carritoService.carrito$.pipe(takeUntil(this.endSubs$)).subscribe((respuestaCarrito) => {
      this.carritoItemDetallado = [];
      this.carritoCont = respuestaCarrito?.items!.length ?? 0;
      respuestaCarrito.items!.forEach((carritoitem) => {
        this.pedidosService.getProducto(carritoitem.productoId!).subscribe((respProduct) => {
          this.carritoItemDetallado.push({
            producto: respProduct,
            cantidad: carritoitem.cantidad
          });
        });
      });
    });
  }

  volverAComprar() {
    this.router.navigate(['/productos']);
  }

  deleteCarritoItem(carritoItem: CarritoItemDetallado) {
    this.carritoService.deleteCarritoItem(carritoItem.producto.id);
  }

  updateCantidadItemCarrito(event: any, carritoItem: CarritoItemDetallado) {
    this.carritoService.setCarritoItem(
      {
        productoId: carritoItem.producto.id,
        cantidad: event.value
      },
      true
    );
  }
}
