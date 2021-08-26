import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {


  apiURLCategorias = environment.apiUrl + 'categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiURLCategorias);
  }
  getCategoria(id_categoria: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiURLCategorias}/${id_categoria}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiURLCategorias, categoria);
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiURLCategorias}/${categoria._id}`, categoria);
  }

  deleteCategoria(id_categoria: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCategorias}/${id_categoria}`);
  }
}
