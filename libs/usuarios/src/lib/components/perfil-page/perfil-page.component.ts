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

import { PdfMakeWrapper, Txt, ITable, Table, Columns,Img } from 'pdfmake-wrapper';
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

  pedido!: any;
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

  buildTableBody(data:any,columns:any) {
    const body = [];
    body.push(columns);
    data.forEach(function(row:any) {
      var dataRow:any = [];

      columns.forEach(function(column:any) {
          dataRow.push(row[column].toString());
      })

      body.push(dataRow);
  });

  return body;
  }


  async generarPDFPedido(pedidoId: any){
    this.pedidoId = pedidoId
    this._getPedidoUsuario()

    const pdf = new PdfMakeWrapper();

    pdf.add( await new Img('https://scontent.flim15-2.fna.fbcdn.net/v/t1.6435-9/117444994_2721265124641153_9017967486796541863_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeG4jJpreJs-6PymvD0irrYezcb-rJXAfYHNxv6slcB9geSyShfzdcz1SVpdlJNEBzc1b9mKTjbSUb1ILN9CXdxW&_nc_ohc=qONc3RUUtS0AX8uAKfG&_nc_ht=scontent.flim15-2.fna&oh=a1b9d1c45c8dad10313b95e46efea54a&oe=61BCE665').height(100).width(80).build() );

    pdf.add(
        new Txt("Comprobante de pago").bold().fontSize(25).margin([0,0,0,5]).end
    );
    pdf.add(
      new Txt("Id del pedido").bold().fontSize(16).color("#141414").end
     );
      pdf.add(
        new Txt(this.pedido.id!).italics().color("#292929").margin([0,0,0,2]).end
      );

     pdf.add(
      new Txt("Fecha del pedido").bold().fontSize(16).color("#141414").end
     );
        pdf.add(
          new Txt(this.pedido.fecha_pedido!).italics().color("#292929").margin([0,0,0,2]).end
        );

     pdf.add(
      new Txt("Estado del pedido").bold().fontSize(16).color("#141414").end
     );

     pdf.add(
      new Txt(this.estadoPedido[this.pedido.estado!].label).italics().color("#292929").margin([0,0,0,10]).end
    );

     pdf.add(
      new Txt("Productos").bold().fontSize(20).margin([0,0,0,5]).end
     );



     for(let pedido of this.pedido.order_prods!){
      pdf.add(
      new Columns([
        pedido.producto.nombre, pedido.producto.marca, pedido.producto.categoria.nombre, pedido.producto.precio, pedido.cantidad, pedido.producto.precio * pedido.cantidad!
      ]).end
      )
    }

     pdf.add(
      new Txt("Total del precio del pedido").bold().margin([0,15,0,0]).fontSize(16).color("#141414").end
     );
     pdf.add(
      new Txt(this.pedido.totalPrecio!).italics().color("#292929").margin([0,0,0,2]).end
    );

     pdf.add(
      new Txt("Direccion del pedido").bold().italics().fontSize(16).color("#141414").end
     );
     pdf.add(
       new Columns([this.pedido.envio_direcc1!,this.pedido.envio_direcc2!,this.pedido.cod_postal!,this.pedido.ciudad!]).end
    );

     pdf.add(
      new Txt("Informacion del Cliente").bold().fontSize(16).color("#141414").margin([0,10,0,0]).end
     );
     pdf.add(
      new Txt(this.pedido.usuario.nombre).italics().color("#292929").margin([0,0,0,2]).end
    );


     pdf.add(
      new Txt("Informacion del Contacto").fontSize(16).bold().color("#141414").end
     );
     pdf.add(
      new Txt(this.pedido.telef!).italics().color("#292929").end
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
