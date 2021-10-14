import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComprasService, Compra, CompraService } from '@bluebits/pedidos';
import { UsuariosService } from '@bluebits/usuarios';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompraItem } from './../../../../../../../libs/pedidos/src/lib/models/compra-item';
import {
  CompraGuardado,
  CompraGuardadoItem,
  CompraGuardadoItemDetallado,
} from './../../../../../../../libs/pedidos/src/lib/models/compra-guardado';
import { Producto, ProductosService } from '@bluebits/productos';

@Component({
  selector: 'admin-compras-act',
  templateUrl: './compras-act.component.html',
  styles: [],
})
export class ComprasRegistroFormComponent implements OnInit, OnDestroy {
  compraItems: CompraItem[] = [];
  form!: FormGroup;
  formDetalle!: FormGroup;
  enviado = false;
  producto!: Producto;
  imageDisplay!: string | ArrayBuffer;
  endsubs$: Subject<any> = new Subject();
  id_compra_act!: string;
  compra!: Compra;
  usuarioId!: string;
  imagenXD!: any;
  productos: Producto[] = [];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private comprasService: ComprasService,
    private compraService: CompraService,
    private productoService: ProductosService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._autoFillUserData();

    this._getProductos();
    this.onVaciar();
    //this._getComprasItems();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getProductos() {
    this.productoService
      .getProductos()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((productos) => {
        this.productos = productos;
      });
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      proveedor: ['', Validators.required],
      total_pagado: ['00.0', Validators.required],
      nota: ['', Validators.required],
      dia: ['00', Validators.required],
      mes: ['00'],
      anio: ['00', Validators.required],
      image: ['', Validators.required],
    });

    this.formDetalle = this.formBuilder.group({
      producto: ['', Validators.required],
      precio_compra: ['00.0', Validators.required],
      detalle: ['', Validators.required],
      cantidad: ['0', Validators.required],
    });
  }

  private _autoFillUserData() {
    console.log('xd');

    this.usuariosService
      .observeCurrentUsuario()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((user: any) => {
        if (user) {
          this.usuarioId = user.id;
        }
      });
  }

  private _getComprasItems() {
    const compra: CompraGuardado = this.compraService.getCompraSto();

    this.compraItems = compra.items!.map((item) => {
      return {
        producto: item.productoId,
        precio_compra: item.precio_compra,
        cantidad: item.cantidad,
        detalle: item.detalle,
      };
    });
  }

  deleteCarritoItem(compraItem: CompraGuardadoItemDetallado) {
    this.compraService.deleteCompraItem(compraItem.producto);

    this._getComprasItems();
  }

  onGuardar() {
    this.enviado = true;
    if (this.compraDetalleForm.invalid) {
      return;
    }

    const compra: CompraGuardadoItem = {
      productoId: this.compraDetalleForm.producto.value,
      cantidad: this.compraDetalleForm.cantidad.value,
      detalle: this.compraDetalleForm.detalle.value,
      precio_compra: this.compraDetalleForm.precio_compra.value,
    };

    this.compraService.setCompraItem(compra);
    this._getComprasItems();
  }

  onVaciar() {
    this.compraService.vaciarCompra();
    this._getComprasItems();
  }

  onSubmit() {
    this.enviado = true;
    if (this.compraForm.invalid) {
      return;
    }

    const compra: Compra = {
      compra_prods: this.compraItems,
      total_pagado: this.compraForm.total_pagado.value,
      proveedor: this.compraForm.proveedor.value,
      image: this.imagenXD,
      nota: this.compraForm.nota.value,
      dia: this.compraForm.dia.value,
      mes: this.compraForm.mes.value,
      anio: this.compraForm.anio.value,
      usuario: this.usuarioId,
      fecha_create: `${Date.now()}`,
    };

    this.comprasService
      .crearCompra(compra)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(() => {
        const compraFormData = new FormData();
        Object.keys(this.compraForm).map((key) => {
          compraFormData.append(key, this.compraForm[key].value);
        });

        this.comprasService
          .updateCompraAutomatico(compraFormData)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Compra fue actualizado!',
              });
              timer(2000)
                .toPromise()
                .then(() => {
                  this.location.back();
                });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Compra no fue actualizado!',
              });
            }
          );
        this.compraService.vaciarCompra();
      });
  }

  onCancle() {
    this.location.back();
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')!.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }

    this.imagenXD = file;

    console.log(file);
  }

  get compraForm() {
    return this.form.controls;
  }

  get compraDetalleForm() {
    return this.formDetalle.controls;
  }
}
