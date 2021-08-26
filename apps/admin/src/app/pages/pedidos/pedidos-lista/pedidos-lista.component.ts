import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido, PedidosService } from '@bluebits/pedidos';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../pedido.constants';

@Component({
  selector: 'bluebits-pedidos-lista',
  templateUrl: './pedidos-lista.component.html'
})
export class PedidosListaComponent implements OnInit {

  pedidos: Pedido[] = [];
  estadoPedido = ORDER_STATUS;

  constructor(
    private pedidoService: PedidosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getPedidos();
  }

  _getPedidos() {
    this.pedidoService.getPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  showPedido(pedidoId: any) {
    this.router.navigateByUrl(`pedidos/${pedidoId}`);
  }

  deletePedido(pedidoId: string) {
    this.confirmationService.confirm({
      message: 'Quieres eliminar el pedido?',
      header: 'Eliminar el pedido',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pedidoService.deletePedido(pedidoId).subscribe(
          () => {
            this._getPedidos();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Pedido eliminado!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Pedido no fue eliminado!'
            });
          }
        );
      }
    });
  }
}
