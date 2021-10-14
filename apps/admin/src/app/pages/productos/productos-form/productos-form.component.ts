import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService, Producto, ProductosService, Categoria } from '@bluebits/productos';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-productos-form',
  templateUrl: './productos-form.component.html',
  styles: [
  ]
})
export class ProductosFormComponent implements OnInit, OnDestroy {

  editar_mode = false;
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
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      precio: ['', Validators.required],
      categoria: ['', Validators.required],
      cont_stock: ['0'],
      descripcion: ['', Validators.required],
      grande_descripcion: [''],
      image: ['', Validators.required],
      destacado: [false]
    });
  }

  private _getCategorias() {
    this.categoriaService.getCategorias().pipe(takeUntil(this.endsubs$)).subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  private _addProducto(producto_dato: FormData) {

    console.log(producto_dato)

    this.productoService.crearProducto(producto_dato).pipe(takeUntil(this.endsubs$)).subscribe(
      (producto: Producto) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: `Producto ${producto.nombre} fue creado!`
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
          detail: 'Product no fue creado!'
        });
      }
    );
  }

  private _updateProducto(productoFormData: FormData) {

    console.log(productoFormData)

    console.log(this.id_producto_act)

    productoFormData.forEach((value,key) => {
      console.log(key+" "+value)
    });

    this.productoService.updateProducto(productoFormData, this.id_producto_act).pipe(takeUntil(this.endsubs$)).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Producto fue actualizado!'
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
          detail: 'Producto no fue actualizado!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.editar_mode = true;
        this.id_producto_act = params.id;
        this.productoService.getProducto(params.id).pipe(takeUntil(this.endsubs$)).subscribe((producto) => {

          console.log(producto)
          this.productoForm.nombre.setValue(producto.nombre);
          this.productoForm.categoria.setValue(producto.categoria!._id);
          this.productoForm.marca.setValue(producto.marca);
          this.productoForm.precio.setValue(producto.precio);
          this.productoForm.cont_stock.setValue(producto.cont_stock);
          this.productoForm.destacado.setValue(producto.destacado);
          this.productoForm.descripcion.setValue(producto.descripcion);
          this.productoForm.grande_descripcion.setValue(producto.grande_descripcion);

          this.imageDisplay = producto.image as string;

          this.productoForm.image.setValidators([]);

          this.productoForm.image.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.enviado = true;
    if (this.form.invalid) return;

    const productoFormData = new FormData();
    Object.keys(this.productoForm).map((key) => {
      productoFormData.append(key, this.productoForm[key].value);

      console.log(this.productoForm[key].value)

    });
    if (this.editar_mode) {
      this._updateProducto(productoFormData);
    } else {
      this._addProducto(productoFormData);
    }
  }
  onCancle() {this.location.back();}


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

    console.log(file.name)
  }

  get productoForm() {
    return this.form.controls;
  }
}
