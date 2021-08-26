import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido, PedidosService } from '@bluebits/pedidos';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../pedido.constants';

@Component({
  selector: 'bluebits-pedidos-detalle',
  templateUrl: './pedidos-detalle.component.html'
})
export class PedidosDetalleComponent implements OnInit {
  pedido!: Pedido;
  estadosPedido: any;
  estadoSeleccionado: any;

  constructor(
    private pedidoService: PedidosService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapEstadoPedido();
    this._getPedido();
  }

  private _mapEstadoPedido() {
    this.estadosPedido = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getPedido() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.pedidoService.getPedido(params.id).subscribe((pedido) => {
          this.pedido = pedido;
          this.estadoSeleccionado = pedido.estado;
        });
      }
    });
  }

  onStatusChange(event: any) {
    this.pedidoService.updatePedido({ estado: event.value }, this.pedido.id!).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Pedido actualizado!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Pedido no ha sido actualizado!'
        });
      }
    );
  }
}
