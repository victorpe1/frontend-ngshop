import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoItem, CarritoService } from '@bluebits/pedidos';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/producto.service';
import { UsuariosService } from '@bluebits/usuarios';
import { Comentario } from '../../models/comentario';

@Component({
  selector: 'producto-page',
  templateUrl: './producto-page.component.html',
  styles: [],
})
export class ProductoPageComponent implements OnInit {
  producto!: Producto;
  imagenes: string[] = [];

  comentarios: Comentario[] = [];
  endSubs$: Subject<any> = new Subject();
  cantidad = 1;
  usuarioId!: string;
  productoIdd!: string;
  unsubscribe$: Subject<any> = new Subject();

  hay_stock: any = false;

  constructor(
    private prodService: ProductosService,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productoId) {
        this._getProducto(params.productoId);
      }
    });
    this.route.params.subscribe((params) => {
      if (params.productoId) {
        this._getComentarios(params.productoId);
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
      cantidad: this.cantidad,
    };
    this.carritoService.setCarritoItem(cartItem);
  }

  private _getProducto(id: string) {
    this.prodService
      .getProducto(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProducto) => {
        this.imagenes[0] = resProducto.image!;

        for (let i = 0; i < resProducto.images!.length; i++) {
          this.imagenes[i + 1] = resProducto.images![i];
        }

        this.producto = resProducto;
        this.productoIdd = resProducto._id!;

        if (resProducto.cont_stock! <= 0) {
          this.hay_stock = true;
        }
      });
  }

  private _getComentarios(id: string) {
    this.prodService.getComentarios(id).subscribe((comentario) => {
      this.comentarios = comentario;
      console.log(comentario);
    });
  }
}
