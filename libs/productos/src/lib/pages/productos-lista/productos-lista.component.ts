import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../models/categoria';
import { Producto } from '../../models/producto';
import { CategoriaService } from '../../services/categoria.service';
import { ProductosService } from '../../services/producto.service';

@Component({
  selector: 'productos-lista',
  templateUrl: './productos-lista.component.html',
  styles: [
  ]
})
export class ProductosListaComponent implements OnInit {

  productos: Producto[] = [];
  categorias: Categoria[] = [];
  esPaginaCategoria!: boolean;

  constructor(
    private prodService: ProductosService,
    private catService: CategoriaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoriaId ? this._getProductos([params.categoriaId]) : this._getProductos();
      params.categoriaId ? (this.esPaginaCategoria = true) : (this.esPaginaCategoria = false);
    });
    this._getCategorias();
  }

  private _getProductos(FiltroCategorias?: any[] ) {
    this.prodService.getProductos(FiltroCategorias).subscribe((resProductos) => {
      this.productos = resProductos;
    });
  }

  private _getCategorias() {
    this.catService.getCategorias().subscribe((resCategoria) => {
      this.categorias = resCategoria;
    });
  }

  FiltroCategoria() {
    const categoriaSeleccionada = this.categorias
      .filter((categoria) => categoria.seleccionado)
      .map((categoria) => categoria._id) ?? '';

    this._getProductos(categoriaSeleccionada);
  }
}
