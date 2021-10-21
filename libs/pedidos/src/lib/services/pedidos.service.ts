import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pedido } from '../models/pedido';
import { environment } from '@env/environment';
import { PedidoItem } from './../models/pedido-item';

import { StripeService } from 'ngx-stripe';
import { Producto } from 'libs/productos/src/lib/models/producto';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  apiURLPedidos = environment.apiUrl + 'orders';

  apiURLProductos = environment.apiUrl + 'productos';

  constructor(private http: HttpClient, private stripeService: StripeService) {}

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiURLPedidos);
  }

  getPedidosUsuario(id_usuario: any): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiURLPedidos}/get/pedido/${id_usuario}`);
  }

  getPedido(pedidoId: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiURLPedidos}/${pedidoId}`);
  }

  prePedidoResta(pedido: Pedido): Observable<any> {
    return this.http.put<Pedido>(`${this.apiURLPedidos}/preventaMenos/`, pedido);
  }

  prePedidoCancelacion(pedido: Pedido): Observable<any> {
    return this.http.put<Pedido>(`${this.apiURLPedidos}/preventaRecuperar/`, pedido);
  }

  createPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiURLPedidos, pedido);
  }

  updatePedido(
    estadoPedido: { estado: string },
    pedidoId: string
  ): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiURLPedidos}/${pedidoId}`,
      estadoPedido
    );
  }

  deletePedido(pedidoId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLPedidos}/${pedidoId}`);
  }

  getCantPedidos(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLPedidos}/get/cant`)
      .pipe(map((object: any) => object.cantPedido));
  }

  getTotalVendidos(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLPedidos}/get/ventaTotales`)
      .pipe(map((object: any) => object.total_ventas));
  }

  getProducto(productoId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProductos}/${productoId}`);
  }


  getProductos(): Observable<Producto[]> {

    return this.http.get<Producto[]>(this.apiURLProductos);
  }



  /*crearCheckOutSession(pedidoItem: PedidoItem[]) {
    return this.http
      .post(`${this.apiURLPedidos}/create-checkout-session`, pedidoItem)
      .pipe(
        switchMap((session: {}) => {
          return this.stripeService.redirectToCheckout({
            sessionId: session.id,
          });
        })
      );
  }*/

  cachePedidoData(pedido: Pedido){
    localStorage.setItem('pedidoData', JSON.stringify(pedido))
  }

  getCachePedidoData(): Pedido{

    return JSON.parse(localStorage.getItem('pedidoData')!);
  }

  eliminarCachePedidoData (){
    localStorage.removeItem('pedidoData')
  }

}
