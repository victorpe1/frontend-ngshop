import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService, Producto, ProductosService, Categoria, Producto2 } from '@bluebits/productos';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-stock_detalle',
  templateUrl: './stock_detalle.component.html'
})
export class StockDetallePageComponent implements OnInit, OnDestroy  {

  form!: FormGroup;
  enviado = false;
  categorias: Categoria[] = [];
  imageDisplay!: string | ArrayBuffer;
  id_producto_act!: string;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private productoService: ProductosService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategorias();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      nombre: [{value: '', disabled: true} ],
      categoria: [''],
      cont_stock: ['', Validators.required]
    });
  }

  private _getCategorias() {
    this.categoriaService.getCategorias().pipe(takeUntil(this.endsubs$)).subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  private _updateProducto(producto: Producto) {

    this.productoService.updateProductoStock(producto).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: 'Stock ha sido actualizado!'
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
          detail: 'Stock no ha sido actualizado!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {

        this.id_producto_act = params.id;
        this.productoService.getProducto(params.id).pipe(takeUntil(this.endsubs$)).subscribe((producto) => {

          console.log(producto)
          this.productoForm.nombre.setValue(producto.nombre);
          this.productoForm.categoria.setValue(producto.categoria!._id);
          this.productoForm.cont_stock.setValue(producto.cont_stock);
        });
      }
    });
  }

onSubmit() {
    this.enviado = true;
    if (this.form.invalid) return;

    const producto: Producto2 = {
      id: this.id_producto_act,
      cont_stock: this.productoForm.cont_stock.value,
    }

    this._updateProducto(producto);
  }
  onCancle() {this.location.back();}


  get productoForm() {
    return this.form.controls;
  }
}
