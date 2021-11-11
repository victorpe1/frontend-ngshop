import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComprasService, Compra } from '@bluebits/pedidos';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-compras-form',
  templateUrl: './compras-form.component.html',
  styles: [
  ]
})
export class ComprasFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  enviado = false;
  imageDisplay!: string | ArrayBuffer;
  endsubs$: Subject<any> = new Subject();
  id_compra_act!: string;
  compra!: Compra;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private comprasService: ComprasService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

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
      proveedor: ['', Validators.required],
      total_pagado: ['00.0', Validators.required],
      nota: ['', Validators.required],
      dia: ['00', Validators.required],
      mes: ['00'],
      anio: ['00', Validators.required],
      image: ['', Validators.required],
    });
  }


  private _updateCompra(compraFormData: FormData) {

    console.log(compraFormData)

    console.log(this.id_compra_act)

    compraFormData.forEach((value,key) => {
      console.log(key+" "+value)
    });

    this.comprasService.updateCompra(compraFormData, this.id_compra_act).pipe(takeUntil(this.endsubs$)).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Compra fue actualizado!'
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
          detail: 'Compra no fue actualizado!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.id_compra_act = params.id;

        this.comprasService.getCompra(params.id).pipe(takeUntil(this.endsubs$)).subscribe((compra) => {
          console.log(compra)
          this.compra = compra;
          this.compraForm.proveedor.setValue(compra.proveedor);
          this.compraForm.total_pagado.setValue(compra.total_pagado);
          this.compraForm.nota.setValue(compra.nota);
          this.compraForm.dia.setValue(compra.dia);
          this.compraForm.mes.setValue(compra.mes);
          this.compraForm.anio.setValue(compra.anio);

          this.imageDisplay = compra.image as string;
          this.compraForm.image.setValidators([]);
          this.compraForm.image.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.enviado = true;
    if (this.form.invalid) return;

    const compraFormData = new FormData();
    Object.keys(this.compraForm).map((key) => {
      compraFormData.append(key, this.compraForm[key].value);
    });

    this._updateCompra(compraFormData);

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
    console.log(file)
  }

  get compraForm() {
    return this.form.controls;
  }
}
