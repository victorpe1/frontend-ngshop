import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CarritoItemDetallado} from '../../models/carrito';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PedidosService } from '../../services/pedidos.service';

declare var $: any;
declare var jQuery:any;

@Component({
  selector: 'pedidos-carrito-icon',
  templateUrl: './carrito-icon.component.html',
  styleUrls: ['./carrito-icon.scss']
})
export class CarritoIconComponent implements OnInit, OnDestroy {


  carritoCont = 0;
  contador!: string
  auxiliar!: CarritoItemDetallado
  carritoItemDetallado: CarritoItemDetallado[]=[];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private carritoService: CarritoService,
    private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((carrito) => {
      this.carritoCont = carrito.items?.length ?? 0;
      this.contador = String(this.carritoCont)
    })

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
      console.log(this.carritoItemDetallado)
    });
  }

  deleteCarritoItem(carritoItem: CarritoItemDetallado) {
    console.log("xd")
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
