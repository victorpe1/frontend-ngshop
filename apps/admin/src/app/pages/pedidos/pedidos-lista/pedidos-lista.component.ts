import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido, PedidosService } from '@bluebits/pedidos';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ORDER_STATUS } from '../pedido.constants';

@Component({
  selector: 'bluebits-pedidos-lista',
  templateUrl: './pedidos-lista.component.html'
})
export class PedidosListaComponent implements OnInit, OnDestroy {

  pedidos: Pedido[] = [];
  estadoPedido = ORDER_STATUS;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private pedidoService: PedidosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getPedidos();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  _getPedidos() {
    this.pedidoService.getPedidos().pipe(takeUntil(this.endsubs$)).subscribe((pedidos) => {
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
        this.pedidoService.deletePedido(pedidoId).pipe(takeUntil(this.endsubs$)).subscribe(
          () => {
            this._getPedidos();
            this.messageService.add({
              severity: 'success',
              summary: 'Actualizado',
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
