import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Compra } from '../models/compra';
import { environment } from '@env/environment';
import { CompraItem } from './../models/compra-item';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {

  apiURLCompras = environment.apiUrl + 'compras';

  constructor(private http: HttpClient) {}

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiURLCompras);
  }

  getCompra(compraId: string): Observable<Compra> {
    return this.http.get<Compra>(`${this.apiURLCompras}/${compraId}`);
  }

  crearCompra(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.apiURLCompras, compra);
  }

  updateCompra(compraData: FormData, id_prod: string): Observable<Compra> {
    return this.http.put<Compra>(`${this.apiURLCompras}/${id_prod}`, compraData);
  }

  updateCompraAutomatico(compraData: FormData): Observable<Compra> {
    console.log("eliminar")
    return this.http.put<Compra>(this.apiURLCompras, compraData);
  }

  deleteCompra(id_prod: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCompras}/${id_prod}`);
  }

}
