import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria, CategoriaService, Producto, ProductosService } from '@bluebits/productos';

@Component({
  selector: 'productos-buscar-lista',
  templateUrl: './buscar-lista.component.html',
  styles: [
  ]
})
export class BuscarListaComponent implements OnInit {

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
     this._getProductos2(params.nombreProd);

      console.log(params.nombreProd)
    });
    this._getCategorias();
  }

  private _getProductos(FiltroCategorias?: any[] ) {
    this.prodService.getProductos(FiltroCategorias).subscribe((resProductos) => {
      this.productos = resProductos;
    });
  }

  private _getProductos2(Filtro: string ) {
    this.prodService.getProductosBuscados(Filtro).subscribe((resProductos) => {
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
