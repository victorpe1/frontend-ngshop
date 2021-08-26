import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from '../models/pedido';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  apiURLPedidos = environment.apiUrl + 'orders';

  apiURLProductos = environment.apiUrl + 'productos';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiURLPedidos);
  }

  getPedido(pedidoId: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiURLPedidos}/${pedidoId}`);
  }

  createPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiURLPedidos, pedido);
  }

  updatePedido(estadoPedido: { estado: string }, pedidoId: string): Observable<Pedido> {
    console.log(estadoPedido)

    return this.http.put<Pedido>(`${this.apiURLPedidos}/${pedidoId}`, estadoPedido);
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

}
