import { Component, OnInit } from '@angular/core';
import { CarritoService } from '@bluebits/pedidos';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ngshop-messages',
  templateUrl: './messages.component.html',
  styles: []
})
export class MessagesComponent implements OnInit {
  constructor(
    private carritoService: CarritoService,
     private messageService: MessageService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Carrito actualizado!'
      });
    });
  }
}
