import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComprasService, Compra, CompraService } from '@bluebits/pedidos';
import { UsuariosService } from '@bluebits/usuarios';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CompraItem,
  CompraItem2,
} from './../../../../../../../libs/pedidos/src/lib/models/compra-item';
import {
  CompraGuardado,
  CompraGuardadoItem,
  CompraGuardadoItemDetallado,
} from './../../../../../../../libs/pedidos/src/lib/models/compra-guardado';
import {
  Producto,
  ProductosService,
  Proveedor,
  ProveedorSUNAT,
} from '@bluebits/productos';
import {
  ModalDismissReasons,
  NgbModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'admin-compras-act',
  templateUrl: './compras-act.component.html',
  styles: [],
})
export class ComprasRegistroFormComponent implements OnInit, OnDestroy {
  compraItems: CompraItem2[] = [];
  form!: FormGroup;
  formDetalle!: FormGroup;
  formProveedor!: FormGroup;

  enviado = false;
  producto!: Producto;
  imageDisplay!: string | ArrayBuffer;
  endsubs$: Subject<any> = new Subject();
  id_compra_act!: string;
  compra!: Compra;
  usuarioId!: string;
  imagenXD!: any;
  productos: Producto[] = [];

  condicion: any = "";
  estado: any = "";
  proveedores: Proveedor[] = [];
  proveedor_busqueda!: ProveedorSUNAT;
  importe_total: any;
  closeResult: string | undefined;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private comprasService: ComprasService,
    private compraService: CompraService,
    private productoService: ProductosService,
    private location: Location,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._autoFillUserData();

    this._getProductos();
    this._getProveedores();
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

  private _getProveedores() {
    this.productoService
      .getProveedores()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((proveedores) => {
        this.proveedores = proveedores;
        console.log(this.proveedores)
      });


  }

  _buscarProveedorSUNAT() {
    this.productoService
      .getProveedoresSUNAT(this.proveedorForm.ruc.value)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((proveedores) => {

        this.proveedor_busqueda = proveedores;
        this.condicion = proveedores.condicion;
        this.estado = proveedores.estado;

        this.proveedorForm.raz_social.setValue(
          this.proveedor_busqueda.razonSocial
        );
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

    this.formProveedor = this.formBuilder.group({
      ruc: ['', Validators.required],
      raz_social: ['', Validators.required],
    });
  }

  private _autoFillUserData() {
    this.usuariosService
      .observeCurrentUsuario()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((user: any) => {
        if (user) {
          this.usuarioId = user.id;
        }
      });
  }

  /*open(content: any) {

    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', size: 'lg' });
  }*/

  private _getComprasItems() {
    this.importe_total = 0;
    const compra: CompraGuardado = this.compraService.getCompraSto();

    let nameP: any;

    compra.items!.map((item) => {
      this.importe_total! += item.precio_compra! * item.cantidad!;
    });

    console.log(this.importe_total);

    this.compraItems = compra.items!.map((item) => {
      this.productos.map((producto) => {
        if (item.productoId == producto._id) {
          nameP = producto.nombre;
        }
      });

      console.log(nameP);
      return {
        producto: item.productoId,
        precio_compra: item.precio_compra,
        cantidad: item.cantidad,
        nombre: nameP,
        detalle: item.detalle,
      };
    });
  }

  deleteCarritoItem(compraItem: CompraGuardadoItemDetallado) {
    this.compraService.deleteCompraItem(compraItem.producto);

    this._getComprasItems();
    this.compraForm.total_pagado.setValue(this.importe_total);
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
    this.compraForm.total_pagado.setValue(this.importe_total);
  }

  onSubmitProveedor() {
    this.enviado = true;
    if (this.formProveedor.invalid) {
      return;
    }
    const proveedor: Proveedor = {
      ruc: this.proveedorForm.ruc.value,
      raz_social: this.proveedorForm.raz_social.value,
      estado: this.estado,
      condicion: this.condicion,
    };


    console.log(proveedor)
    this._addProveedor(proveedor);
    this._getProveedores();
  }

  private _addProveedor(proveedor: Proveedor) {
    this.productoService
      .crearProveedor(proveedor)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (proveedor: Proveedor) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: `Proveedor ${proveedor.raz_social} ha sido creado!`,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              $('#myModal').modal('hide');
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Proveedor no ha sido creado',
          });
        }
      );
  }

  onVaciar() {
    this.compraService.vaciarCompra();
    this._getComprasItems();
    this.compraForm.total_pagado.setValue(this.importe_total);
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

  get proveedorForm() {
    return this.formProveedor.controls;
  }
}
