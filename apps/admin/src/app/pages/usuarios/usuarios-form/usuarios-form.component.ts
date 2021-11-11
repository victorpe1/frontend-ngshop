import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService, Usuario } from '@bluebits/usuarios';


@Component({
  selector: 'bluebits-usuarios-form',
  templateUrl: './usuarios-form.component.html'
})
export class UsuariosFormComponent implements OnInit {
  form!: FormGroup;
  enviado = false;
  editar_mode = false;
  id_producto_act!: string;
  paises: any;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUsuarioForm();
    this._checkEditMode();
    this._getPaises();
  }

  private _initUsuarioForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telef: ['', Validators.required],
      admi: [false],
      calle: [''],
      apartamento: [''],
      cod_postal: [''],
      ciudad: [''],
      pais: ['']
    });
  }

  private _getPaises() {
    this.paises = this.usuariosService.getPaises();
  }

  private _addUsuario(usuario: Usuario) {

    this.usuariosService.createUsuario(usuario).subscribe(
      (usuario: Usuario) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: `Usuario ${usuario.nombre} ha sido creado!`
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
          detail: 'Usuario no ha sido creado!'
        });
      }
    );
  }

  private _updateUsuario(usuario: Usuario) {
    this.usuariosService.updateUsuario(usuario).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: 'Usuario ha sido actualizado!'
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
          detail: 'Usuario no ha sido actualizado!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editar_mode = true;
        this.id_producto_act = params.id;
        this.usuariosService.getUsuario(params.id).subscribe((usuario) => {
          this.usuarioForm.nombre.setValue(usuario.nombre);
          this.usuarioForm.email.setValue(usuario.email);
          this.usuarioForm.telef.setValue(usuario.telef);
          this.usuarioForm.admi.setValue(usuario.admi);
          this.usuarioForm.calle.setValue(usuario.calle);
          this.usuarioForm.apartamento.setValue(usuario.apartamento);
          this.usuarioForm.cod_postal.setValue(usuario.cod_postal);
          this.usuarioForm.ciudad.setValue(usuario.ciudad);
          this.usuarioForm.pais.setValue(usuario.pais);

          this.usuarioForm.password.setValidators([]);
          this.usuarioForm.password.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.enviado = true;
    if (this.form.invalid) {
      return;
    }
    const usuario: Usuario = {
      id: this.id_producto_act,
      nombre: this.usuarioForm.nombre.value,
      email: this.usuarioForm.email.value,
      telef: this.usuarioForm.telef.value,
      admi: this.usuarioForm.admi.value,
      calle: this.usuarioForm.calle.value,
      password: this.usuarioForm.password.value,
      apartamento: this.usuarioForm.apartamento.value,
      cod_postal: this.usuarioForm.cod_postal.value,
      ciudad: this.usuarioForm.ciudad.value,
      pais: this.usuarioForm.pais.value
    };
    if (this.editar_mode) {
      this._updateUsuario(usuario);
    } else {
      this._addUsuario(usuario);
    }
  }

  onCancle() {
    this.location.back();
  }

  get usuarioForm() {
    return this.form.controls;
  }
}

