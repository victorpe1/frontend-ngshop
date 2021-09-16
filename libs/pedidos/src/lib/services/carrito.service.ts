import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Carrito, CarritoItem} from '../models/carrito';

export const CARRITO_KEY = 'carrito';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito$: BehaviorSubject<Carrito> = new BehaviorSubject(this.getCarrito());

  constructor() {}

  initCarritoLocalStorage() {
    const carrito: Carrito = this.getCarrito();
    if (!carrito) {
      const intialCarrito = {
        items: []
      };
      const intialCarritoJson = JSON.stringify(intialCarrito);
      localStorage.setItem(CARRITO_KEY, intialCarritoJson);
    }
  }

  vaciarCarrito() {
    const intialCarrito = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCarrito);
    localStorage.setItem(CARRITO_KEY, intialCartJson);
    this.carrito$.next(intialCarrito);
  }

  getCarrito(): Carrito {
    const carritoJsonString: string = localStorage.getItem(CARRITO_KEY)!;
    const carrito: Carrito = JSON.parse(carritoJsonString);

    return carrito;
  }

  setCarritoItem(carritoItem: CarritoItem, updateCarritoItem?: boolean): Carrito {
    const carrito = this.getCarrito();

    const carritoItemExiste = carrito.items!.find((item) => item.productoId === carritoItem.productoId);
    if (carritoItemExiste) {
      carrito.items!.map((item: any) => {
        if (item.productoId === carritoItem.productoId) {
          if (updateCarritoItem) {
            item.cantidad = carritoItem.cantidad;
          } else {
            item.cantidad = item.cantidad! + carritoItem.cantidad!;
          }

          return item;
        }
      });
    } else {
      carrito.items!.push(carritoItem);
    }

    const carritoJson = JSON.stringify(carrito);
    localStorage.setItem(CARRITO_KEY, carritoJson);
    this.carrito$.next(carrito);

    return carrito;
  }

  deleteCarritoItem(productoId: string) {
    const carrito = this.getCarrito();
    const newCarrito = carrito.items!.filter((item) => item.productoId !== productoId);

    carrito.items = newCarrito;

    const carritoJsonString = JSON.stringify(carrito);
    localStorage.setItem(CARRITO_KEY, carritoJsonString);

    this.carrito$.next(carrito);
  }
}
