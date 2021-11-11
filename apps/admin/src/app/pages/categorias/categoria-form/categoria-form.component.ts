import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService, Categoria } from '@bluebits/productos';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categoria-form',
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  enviado = false;
  editar_mode = false;
  id_categoria_act!: string;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private location: Location,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  onSubmit() {
    this.enviado = true;
    if (this.form.invalid) {
      return;
    }
    const categoria: Categoria = {
      _id: this.id_categoria_act,
      nombre: this.categoriaForm.nombre.value,
      icon: this.categoriaForm.icon.value,
      color: this.categoriaForm.color.value
    };
    if (this.editar_mode) {
      this._updateCategoria(categoria);
    } else {
      this._addCategoria(categoria);
    }
  }

  onCancle() {
    this.location.back();
  }

  private _addCategoria(categoria: Categoria) {

    this.categoriaService.crearCategoria(categoria).pipe(takeUntil(this.endsubs$)).subscribe(
      (categoria: Categoria) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: `Categoria ${categoria.nombre} ha sido creado!`
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
          detail: 'Categoria no ha sido creado'
        });
      }
    );
  }

  private _updateCategoria(categoria: Categoria) {

    this.categoriaService.updateCategoria(categoria).pipe(takeUntil(this.endsubs$)).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Categoria ha sido actualizado!'
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
          detail: 'Categoria no ha sido actualizado!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.editar_mode = true;
        this.id_categoria_act = params.id;
        this.categoriaService.getCategoria(params.id).pipe(takeUntil(this.endsubs$)).subscribe((categoria: any) => {
          this.categoriaForm.nombre.setValue(categoria.nombre);
          this.categoriaForm.icon.setValue(categoria.icon);
          this.categoriaForm.color.setValue(categoria.color);
        });
      }
    });
  }

  get categoriaForm() {
    return this.form.controls;
  }
}

