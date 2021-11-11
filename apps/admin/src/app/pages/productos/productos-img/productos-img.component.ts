import { Component, OnDestroy, OnInit } from '@angular/core';
import { Producto, ProductosService } from '@bluebits/productos';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-productos-img',
  templateUrl: './productos-img.component.html',
  styles: [
  ]
})
export class ProductosImgComponent implements OnInit, OnDestroy {

  productos: Producto[] = [];
  endsubs$: Subject<any> = new Subject();
  imageDisplay!: string | ArrayBuffer;
  //images!: String[];

  id_producto_act!: string;
  form!: FormGroup;
  enviado = false;
  images = new Array<any>() ;
  filesAmount: any;

  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private location: Location,
    private productoService: ProductosService) { }

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      nombre: [{value: '', disabled: true}],
      marca: [{value: '', disabled: true}],
      images: [''],

    });
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.id_producto_act = params.id;

        this.productoService.getProducto(params.id).pipe(takeUntil(this.endsubs$)).subscribe((producto) => {

          console.log(producto)

          this.productoForm.nombre.setValue(producto.nombre);
          this.productoForm.marca.setValue(producto.marca);


          for (let i = 0; i < this.filesAmount; i++) {

          this.images[i] = producto.images![i] as string;
          this.productoForm.images.setValidators([]);
          this.productoForm.images.updateValueAndValidity();

          }

        });
      }
    });
  }

  private _updateProducto(productoFormData: FormData) {

    console.log(this.id_producto_act)

    productoFormData.forEach((value,key) => {
      console.log(key+" "+value)
    });

    this.productoService.updateProductoImagen(productoFormData, this.id_producto_act).pipe(takeUntil(this.endsubs$)).subscribe(
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

  onSubmit() {
    this.enviado = true;
    if (this.form.invalid) return;

    const productoFormData = new FormData();

    Object.keys(this.productoForm).map((key) => {
      productoFormData.append(key, this.productoForm[key].value);
    });

    this._updateProducto(productoFormData);
  }

  onCancle() {this.location.back(); }


  onImageUpload(event: any) {

    this.filesAmount = event.target.files.length;

      for (let i = 0; i < this.filesAmount; i++) {

        const images = event.target.files[i];

        const fileReader = new FileReader();

          fileReader.onload = (event: any) => {

          this.imageDisplay = fileReader.result as string;

          this.images.push(this.imageDisplay);

          this.form.patchValue({
              images: images
           });

        }

        fileReader.readAsDataURL(images);

        console.log(images)
      }



  }

  get productoForm() {
    return this.form.controls;
  }


}
