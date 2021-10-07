import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuario.service';
import { MessageService } from 'primeng/api';
import {PedidosService } from '../../../../../pedidos/src/lib/services/pedidos.service'
import { Pedido } from '../../../../../pedidos/src/lib/models/pedido'
import { ORDER_STATUS } from '../pedido.constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PdfMakeWrapper, Txt, ITable, Table, Columns } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { createImmutabilityCheckMetaReducer } from '@ngrx/store/src/runtime_checks';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'usuarios-perfil',
  templateUrl: './perfil-page.component.html',
  styleUrls: [ './perfil-page.css'
  ]
})
export class PerfilPageComponent implements OnInit, OnDestroy{

  pedidos: Pedido[] = [];
  pedido!: Pedido;
  checkoutFormGroup!: FormGroup;
  unsubscribe$: Subject<any> = new Subject();
  usuarioId!: string;
  usuarioNombre!: string;
  pedidoId!: string;
  enviado = false;
  paises: any;
  estadoPedido = ORDER_STATUS;

  constructor(private pedidoService: PedidosService,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private location: Location,
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getPaises();
    this._getPedidos();

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  openBackDropCustomClass(content: any, pedidoId: any) {
    this.pedidoId = pedidoId

    this._getPedidoUsuario()

    console.log(this.pedidoId)

    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', size: 'lg' });
  }


  generarPDFPedido(pedidoId: any){
    this.pedidoId = pedidoId
    this._getPedidoUsuario()

    const pdf = new PdfMakeWrapper();

    pdf.add(
        new Txt("Comprobante de pago").bold().italics().end
    );
    pdf.add(
      new Txt("Id del pedido").bold().end
     );
      pdf.add(
        new Txt(this.pedido.id!).italics().end
      );

     pdf.add(
      new Txt("Fecha del pedido").bold().end
     );
        pdf.add(
          new Txt(this.pedido.fecha_pedido!).italics().end
        );

     pdf.add(
      new Txt("Estado del pedido").bold().end
     );

     pdf.add(
      new Txt(this.estadoPedido[this.pedido.estado!].label).italics().end
    );

     pdf.add(
      new Txt("Productos").bold().italics().end
     );



     for(let pedido of this.pedido.order_prods!){
      pdf.add(
      new Columns([
        pedido.producto.nombre, pedido.producto.marca, pedido.producto.categoria.nombre, pedido.producto.precio, pedido.cantidad, pedido.producto.precio * pedido.cantidad!
      ]).end
      );
    }

     pdf.add(
      new Txt("Total del precio del pedido").bold().end
     );
     pdf.add(
      new Txt(this.pedido.totalPrecio!).italics().end
    );

     pdf.add(
      new Txt("Direccion del pedido").bold().italics().end
     );
     pdf.add(
      new Txt(this.pedido.envio_direcc1!).italics().end
    );
    pdf.add(
      new Txt(this.pedido.envio_direcc2!).italics().end
    );
    pdf.add(
      new Txt(this.pedido.cod_postal!).italics().end
    );
    pdf.add(
      new Txt(this.pedido.ciudad!).italics().end
    );
    pdf.add(
      new Txt(this.pedido.pais!).italics().end
    );

     pdf.add(
      new Txt("Informacion del Cliente").bold().end
     );
     pdf.add(
      new Txt(this.pedido.usuario.nombre).italics().end
    );


     pdf.add(
      new Txt("Informacion del Contacto").bold().end
     );
     pdf.add(
      new Txt(this.pedido.telef!).italics().end
    );

      pdf.create().open()
  }


  private _getPedidoUsuario() {
      if (this.pedidoId) {
        this.pedidoService.getPedido(this.pedidoId).pipe(takeUntil(this.unsubscribe$)).subscribe((pedido) => {
          this.pedido = pedido;
        });
      }
  }

  _getPedidos() {
    console.log(this.usuarioId)

    this.pedidoService.getPedidosUsuario(this.usuarioId).pipe(takeUntil(this.unsubscribe$)).subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  private _getPaises() {
    this.paises = this.usuariosService.getPaises();
  }

  private _updateUsuario(usuario: Usuario) {
    this.usuariosService.updateUsuario(usuario).subscribe(
      () => {
        this.messageService.add({
          severity: 'sucess',
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
          this.usuarioNombre = user.nombre;
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

  cerrarSesion() {
    this.authService.logoutShop();
  }


}
