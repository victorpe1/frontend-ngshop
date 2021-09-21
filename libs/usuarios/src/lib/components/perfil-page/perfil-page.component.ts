import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuario.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'usuarios-perfil',
  templateUrl: './perfil-page.component.html',
  styleUrls: [ './perfil-page.css'
  ]
})
export class PerfilPageComponent implements OnInit, OnDestroy{

  checkoutFormGroup!: FormGroup;
  unsubscribe$: Subject<any> = new Subject();
  endSubs$: Subject<any> = new Subject();
  usuarioId!: string;
  enviado = false;
  paises: any;

  constructor(private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getPaises();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private _getPaises() {
    this.paises = this.usuariosService.getPaises();
  }

  private _updateUsuario(usuario: Usuario) {
    this.usuariosService.updateUsuario(usuario).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
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

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      telef: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      cod_postal: ['', Validators.required],
      apartamento: ['', Validators.required],
      calle: ['', Validators.required]
    });
  }

  private _autoFillUserData() {
    this.usuariosService
      .observeCurrentUsuario()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: any) => {

        if (user) {
          this.usuarioId = user.id;
          this.checkoutForm.nombre.setValue(user.nombre);
          this.checkoutForm.email.setValue(user.email);
          this.checkoutForm.telef.setValue(user.telef);
          this.checkoutForm.ciudad.setValue(user.ciudad);
          this.checkoutForm.calle.setValue(user.calle);
          this.checkoutForm.pais.setValue(user.pais);
          this.checkoutForm.cod_postal.setValue(user.cod_postal);
          this.checkoutForm.apartamento.setValue(user.apartamento);
          this.checkoutForm.password.setValidators([]);
          this.checkoutForm.password.updateValueAndValidity();
        }
      });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  onSubmit() {
    this.enviado = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    const usuario: Usuario = {
      id: this.usuarioId,
      nombre: this.checkoutForm.nombre.value,
      email: this.checkoutForm.email.value,
      telef: this.checkoutForm.telef.value,
      calle: this.checkoutForm.calle.value,
      password: this.checkoutForm.password.value,
      apartamento: this.checkoutForm.apartamento.value,
      cod_postal: this.checkoutForm.cod_postal.value,
      ciudad: this.checkoutForm.ciudad.value,
      pais: this.checkoutForm.pais.value
    };


    console.log(usuario)
    this._updateUsuario(usuario);

  }

}
