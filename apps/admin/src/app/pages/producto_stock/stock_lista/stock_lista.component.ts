import { Component, OnDestroy, OnInit } from '@angular/core';
import { Producto, ProductosService } from '@bluebits/productos';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-stock_lista',
  templateUrl: './stock_lista.component.html'
})
export class StockListaPageComponent implements OnInit, OnDestroy {


  productos: Producto[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }


    ngOnInit(): void {
      this._getProductos();
    }
    ngOnDestroy() {
      this.endsubs$.next();
      this.endsubs$.complete();
    }

    private _getProductos() {
      this.productosService.getProductos().pipe(takeUntil(this.endsubs$)).subscribe((productos) => {
        this.productos = productos;
      });

    }

    updateProducto(id_prod: string) {
      this.router.navigateByUrl(`productos_stock/form/${id_prod}`);
    }

}
