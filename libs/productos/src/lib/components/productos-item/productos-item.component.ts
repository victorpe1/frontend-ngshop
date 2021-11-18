import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../models/producto';
import { CarritoService, CarritoItem } from '@bluebits/pedidos';

@Component({
  selector: 'productos-producto-item',
  templateUrl: './productos-item.component.html',
  styles: [
  ]
})
export class ProductosItemComponent implements OnInit {
  @Input() producto!: Producto;

  hay_stock: any = false;

  constructor(private carritoService: CarritoService){
  }

  ngOnInit(): void {
      if(this.producto.cont_stock! <= 0){
        this.hay_stock = true;
      }
      console.log(this.hay_stock);
  }

  addProductoAlCarrito() {
    const carritoItem: CarritoItem = {
      productoId: this.producto._id,
      cantidad: 1
    };
    this.carritoService.setCarritoItem(carritoItem);
  }

}
