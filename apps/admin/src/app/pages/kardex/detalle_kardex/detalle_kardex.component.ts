import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriaService,
  Producto,
  ProductosService,
  Categoria,
  KardexProducto
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
export class ProductosKardexDetallesComponent implements OnInit, OnDestroy{
  kardexProducto: KardexProducto[] = [];

  cantidad_ultimo: any;
  precio_existencia_ultimo: any;
  valor_total_ex_ultimo: any;

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
    this._getKardexProducto();
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

  _getKardexProducto() {
    this.productoService
      .getKardexProducto(this.id_producto_act)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((kardexProducto) => {
        this.kardexProducto = kardexProducto;

        this.kardexProducto.map(kardex =>{
          this.cantidad_ultimo = kardex.cantidad_existencia;
          this.precio_existencia_ultimo = kardex.precio_existencia;
          this.valor_total_ex_ultimo = kardex.valor_total_existencia;
         });

      });


  }

  exportarExcel() {}

  onCancle() {
    this.location.back();
  }
}
