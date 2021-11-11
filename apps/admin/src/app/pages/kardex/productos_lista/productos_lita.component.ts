import { Component, OnDestroy, OnInit } from '@angular/core';
import { Producto, ProductosService } from '@bluebits/productos';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-productos_kardex-list',
  templateUrl: './productos_lita.component.html',
  styles: [],
})
export class ProductosKardexListComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProductos();
  }
  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getProductos() {
    this.productosService
      .getProductos()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((productos) => {
        this.productos = productos;
      });
  }


  ver_kardex(id_prod: string) {
    this.router.navigateByUrl(`producto_kardex/${id_prod}`);
  }

}
