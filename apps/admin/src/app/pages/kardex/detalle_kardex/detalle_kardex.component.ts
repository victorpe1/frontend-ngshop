import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriaService,
  Producto,
  ProductosService,
  Categoria,
  CompraProducto,
  VentaProducto,
} from '@bluebits/productos';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import '../../../../assets/js/table.js'

declare var $: any;
declare var jQuery:any;

@Component({
  selector: 'admin-productos-form',
  templateUrl: './detalle_kardex.component.html',
  styleUrls: ['./detalle_kardex.scss'],
})
export class ProductosKardexDetallesComponent implements OnInit, OnDestroy, AfterViewInit{
  compraProductos: CompraProducto[] = [];
  ventaProductos: VentaProducto[] = [];

  //compraItems: CompraItem2[] = [];

  imageDisplay!: string | ArrayBuffer;
  id_producto_act!: string;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private productoService: ProductosService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getComprasVentas();
  }

  ngAfterViewInit(){


  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _initForm() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.id_producto_act = params.id;
      }
    });


  }

  _getComprasVentas() {


    this.productoService
      .getCompraProducto(this.id_producto_act)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((compraProductos) => {
        this.compraProductos = compraProductos;
        console.log(compraProductos);
      });

    this.productoService
      .getVentaProducto(this.id_producto_act)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((veProductos) => {
        this.ventaProductos = veProductos;
        console.log(veProductos);
      });



  }

  exportarExcel() {}

  onCancle() {
    this.location.back();
  }
}
