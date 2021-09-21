import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidosService } from '../../services/pedidos.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'pedidos-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent implements OnInit {

  constructor(private pedidosService: PedidosService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    const pedidoData = this.pedidosService.getCachePedidoData();

    this.pedidosService.createPedido(pedidoData).subscribe(() => {
      this.carritoService.vaciarCarrito()
      this.pedidosService.eliminarCachePedidoData()
    })

  }

}
