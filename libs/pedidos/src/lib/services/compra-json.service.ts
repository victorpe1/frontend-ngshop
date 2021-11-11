import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompraGuardado, CompraGuardadoItem} from '../models/compra-guardado';

export const COMPRA_KEY = 'ingreso';
@Injectable({
  providedIn: 'root'
})
export class CompraService {

  compra$: BehaviorSubject<CompraGuardado> = new BehaviorSubject(this.getCompraSto());

  constructor() {}

  initCompraLocalStorage() {
    const compra: CompraGuardado = this.getCompraSto();

    if (!compra) {
      const intialCompra = {
        items: []
      };

      const intialCompraJson = JSON.stringify(intialCompra);
      localStorage.setItem(COMPRA_KEY, intialCompraJson);
    }
  }

  vaciarCompra() {
    const intialCompra = {
      items: []
    };
    const intialIngresoJson = JSON.stringify(intialCompra);
    localStorage.setItem(COMPRA_KEY, intialIngresoJson);
    this.compra$.next(intialCompra);
  }

  getCompraSto(): CompraGuardado {
    const compraJsonString: string = localStorage.getItem(COMPRA_KEY)!;

    const compra: CompraGuardado = JSON.parse(compraJsonString);

    return compra;
  }




  setCompraItem(compraItem: CompraGuardadoItem, updateCompraItem?: boolean): CompraGuardado {

    console.log(compraItem)
    const compraSaved = this.getCompraSto();

    const carritoItemExiste = compraSaved.items!.find((item) => item.productoId === compraItem.productoId);

      if (carritoItemExiste) {
        compraSaved.items!.map((item: any) => {

          if (item.productoId === compraItem.productoId) {
            if (updateCompraItem) {
              item.cantidad = compraItem.cantidad;
              item.precio_compra = compraItem.precio_compra
              item.detalle = compraItem.detalle

            } else {

              item.precio_compra = compraItem.precio_compra
              item.detalle = compraItem.detalle

              item.cantidad = item.cantidad! + compraItem.cantidad!;
            }

            return item;
          }
        });

      }else{
        compraSaved.items!.push(compraItem);
      }

    const carritoJson = JSON.stringify(compraSaved);
    localStorage.setItem(COMPRA_KEY, carritoJson);
    this.compra$.next(compraSaved);

    return compraSaved;
  }


  deleteCompraItem(productoId: string) {
    const compra = this.getCompraSto();

    const newCompra = compra.items!.filter((item) => item.productoId !== productoId);

    compra.items = newCompra;

    const compraJsonString = JSON.stringify(compra);
    localStorage.setItem(COMPRA_KEY, compraJsonString);

    this.compra$.next(compra);
  }
}
