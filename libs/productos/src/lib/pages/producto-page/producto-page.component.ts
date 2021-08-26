import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoItem, CarritoService } from '@bluebits/pedidos';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/producto.service';

@Component({
  selector: 'producto-page',
  templateUrl: './producto-page.component.html',
  styles: [
  ]
})
export class ProductoPageComponent implements OnInit {

  producto!: Producto;
  endSubs$: Subject<any> = new Subject();
  cantidad = 1;

  constructor(private prodService: ProductosService, private route: ActivatedRoute,
  private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productoId) {
        this._getProducto(params.productoId);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  addProductoAlCarrito() {
    const cartItem: CarritoItem = {
      productoId: this.producto._id,
      cantidad: this.cantidad
    };
    console.log(cartItem)
    this.carritoService.setCarritoItem(cartItem);
  }

  private _getProducto(id: string) {
    this.prodService
      .getProducto(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProducto) => {
        this.producto = resProducto;
      });
  }

}
