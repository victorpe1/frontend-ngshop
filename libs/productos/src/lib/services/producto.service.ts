import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Producto } from '../models/producto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  apiURLProducts = environment.apiUrl + 'productos';

  constructor(private http: HttpClient) {}

  getProductos(FiltroCategoria?: string[]): Observable<Producto[]> {
    let params = new HttpParams();

    if (FiltroCategoria) {
      params = params.append('categorias', FiltroCategoria.join(','));
    }

    return this.http.get<Producto[]>(this.apiURLProducts, { params: params });
  }

  crearProducto(productoData: FormData): Observable<Producto> {
    return this.http.post<Producto>(this.apiURLProducts, productoData);
  }

  getProducto(id_prod: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiURLProducts}/${id_prod}`);
  }

  updateProducto(productoData: FormData, id_prod: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiURLProducts}/${id_prod}`, productoData);
  }

  deleteProducto(id_prod: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${id_prod}`);
  }

  getCantProductos(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/cant`)
      .pipe(map((objeto: any) => objeto.contProducto));
  }

  getDestacadoProducts(cont: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiURLProducts}/get/destacado/${cont}`);
  }
}
