import { Component, OnDestroy, OnInit } from '@angular/core';
import { PedidosService } from '@bluebits/pedidos';
import { ProductosService } from '@bluebits/productos';
import { UsuariosService } from '@bluebits/usuarios';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-panel',
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit, OnDestroy {

  estadisticas = [];
  endsubs$: Subject<any> = new Subject();


  constructor(
    private usuariosService: UsuariosService,
    private productosService: ProductosService,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.pedidosService.getCantPedidos(),
      this.productosService.getCantProductos(),
      this.usuariosService.getCantUsuario(),
      this.pedidosService.getTotalVendidos()
    ]).pipe(takeUntil(this.endsubs$))
    .subscribe((values: any) => {
      this.estadisticas = values;
    });

  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

}
