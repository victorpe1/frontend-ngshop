import { Component, OnDestroy, OnInit } from '@angular/core';
import { Producto, ProductosService } from '@bluebits/productos';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-productos-list',
  templateUrl: './productos-list.component.html',
  styles: [
  ]
})
export class ProductosListComponent implements OnInit, OnDestroy {

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
    this.router.navigateByUrl(`productos/form/${id_prod}`);
  }

  deleteProducto(id_prod: string) {
    this.confirmationService.confirm({
      message: 'Quieres eliminar este producto?',
      header: 'Eliminar Producto',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productosService.deleteProducto(id_prod).pipe(takeUntil(this.endsubs$)).subscribe(
          () => {
            this._getProductos();
            this.messageService.add({
              severity: 'success',
              summary: 'Actualizado',
              detail: 'Producto fue eliminado!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Producto no fue eliminado!'
            });
          }
        );
      }
    });
  }
}
