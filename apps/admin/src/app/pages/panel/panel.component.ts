import { Component, OnInit } from '@angular/core';
import { PedidosService } from '@bluebits/pedidos';
import { ProductosService } from '@bluebits/productos';
import { UsuariosService } from '@bluebits/usuarios';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-panel',
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {

  estadisticas = [];
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
    ]).subscribe((values: any) => {
      this.estadisticas = values;
    });
  }

}
