import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Producto, Producto2, KardexProducto} from '../models/producto';
import { Proveedor, ProveedorSUNAT} from '../models/proveedor';
import { map } from 'rxjs/operators';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  apiURLProducts = environment.apiUrl + 'productos';
  apiURLProvedores = environment.apiUrl + 'proveedor';
  apiURLKardex = environment.apiUrl + 'kardex';

  apURL = 'https://dniruc.apisperu.com/api/v1/ruc';
  apURL2 = '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZpY3Rvci5wYy4wMDA5QGdtYWlsLmNvbSJ9.ttfZICYpLUuKwMriCCMijUOE9YX0QheTuOEpCsJ58dY';

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiURLProvedores);
  }

  getProveedoresSUNAT(ruc: string): Observable<ProveedorSUNAT> {
    return this.http.get<ProveedorSUNAT>(`${this.apURL}/${ruc}${this.apURL2}`);
  }

  crearProveedor(proveedorData: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiURLProvedores, proveedorData);
  }

  getProductos(FiltroCategoria?: string[]): Observable<Producto[]> {
    let params = new HttpParams();

    if (FiltroCategoria) {
      params = params.append('categorias', FiltroCategoria.join(','));
    }

    return this.http.get<Producto[]>(this.apiURLProducts, { params: params });
  }

  getProductosConAnulados(FiltroCategoria?: string[]): Observable<Producto[]> {
    let params = new HttpParams();

    if (FiltroCategoria) {
      params = params.append('categorias', FiltroCategoria.join(','));
    }

    return this.http.get<Producto[]>(`${this.apiURLProducts}/completo_anulados/`, { params: params });
  }


  getKardexProducto(id_prod: string): Observable<KardexProducto[]> {

    return this.http.get<KardexProducto[]>(`${this.apiURLKardex}/kardex_simple/${id_prod}`);
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

  updateProductoImagen(productoData: FormData, id_prod: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiURLProducts}/galeria-imgs/${id_prod}`, productoData);
  }

  updateProductoStock(producto: Producto2): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiURLProducts}/stock/${producto.id}`, producto);
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

  getComentarios(id_prod: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiURLProducts}/review/${id_prod}`);
  }

  getProductosBuscados(nom_prod: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiURLProducts}/busqueda/${nom_prod}`);
  }

}
