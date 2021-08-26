import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'pedidos-carrito-icon',
  templateUrl: './carrito-icon.component.html',
  styles: [
  ]
})
export class CarritoIconComponent implements OnInit {

  carritoCont = 0;
  contador!: string

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((carrito) => {
      this.carritoCont = carrito.items?.length ?? 0;
      this.contador = String(this.carritoCont)
    });

  }
}
