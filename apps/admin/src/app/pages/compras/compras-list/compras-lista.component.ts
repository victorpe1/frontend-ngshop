import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compra, ComprasService } from '@bluebits/pedidos';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bluebits-compras-lista',
  templateUrl: './compras-lista.component.html'
})
export class ComprasListaComponent implements OnInit, OnDestroy {

  compras: Compra[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private compraService: ComprasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCompras();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  _getCompras() {
    this.compraService.getCompras().pipe(takeUntil(this.endsubs$)).subscribe((compras) => {
      this.compras = compras;
      console.log(this.compras)
    });
  }

  deleteCompra(compraId: string) {
    this.confirmationService.confirm({
      message: 'Quieres eliminar el pedido?',
      header: 'Eliminar el pedido',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.compraService.deleteCompra(compraId).pipe(takeUntil(this.endsubs$)).subscribe(
          () => {
            this._getCompras();
            this.messageService.add({
              severity: 'success',
              summary: 'Actualizado',
              detail: 'Compra eliminado!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Compra no fue eliminado!'
            });
          }
        );

      }
    });
  }

  showCompra(compraId: any) {

    this.router.navigateByUrl(`compras/${compraId}`);
  }



}
