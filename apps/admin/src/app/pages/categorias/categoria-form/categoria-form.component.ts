import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService, Categoria } from '@bluebits/productos';

@Component({
  selector: 'admin-categoria-form',
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent implements OnInit {
  form!: FormGroup;
  enviado = false;
  editar_mode = false;
  id_categoria_act!: string;

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
    console.log(categoria.nombre);

    this.categoriaService.crearCategoria(categoria).subscribe(
      (categoria: Categoria) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
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

    this.categoriaService.updateCategoria(categoria).subscribe(
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
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editar_mode = true;
        this.id_categoria_act = params.id;
        this.categoriaService.getCategoria(params.id).subscribe((categoria: any) => {
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

