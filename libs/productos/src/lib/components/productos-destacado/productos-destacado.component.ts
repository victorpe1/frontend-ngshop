import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/producto.service';

@Component({
  selector: 'productos-producto-destacado',
  templateUrl: './productos-destacado.component.html',
  styles: [
  ]
})
export class ProductosDestacadoComponent implements OnInit, OnDestroy {

  productos: Producto[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private prodService: ProductosService) {}

  ngOnInit(): void {
    this._getDestacadoProductos();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getDestacadoProductos() {

    this.prodService
      .getDestacadoProducts(4)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((productos) => {
        this.productos = productos;

      });
  }
}

