import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '@bluebits/usuarios';
import { Carrito } from '../../models/carrito';
import { Pedido } from '../../models/pedido';
import { PedidoItem } from '../../models/pedido-item';
import { CarritoService } from '../../services/carrito.service';
import { PedidosService } from '../../services/pedidos.service';
import { PEDIDO_STATUS } from '../../pedidos.constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pedidos-carrito-page',
  templateUrl: './carrito-page.component.html',
  styles: [
  ]
})
export class CarritoPageComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private carritoService: CarritoService,
    private pedidosService: PedidosService
  ) {}

  checkoutFormGroup!: FormGroup;
  esEnviado = false;
  pedidoItems: PedidoItem[] = [];
  usuarioId!: string;
  paises: any;
  unsubscribe$: Subject<any> = new Subject();

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCarritoItems();
    this._getPaises();
    this._autoFillUserData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
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
        }
      });
  }

  private _getCarritoItems() {
    const carrito: Carrito = this.carritoService.getCarrito();
    this.pedidoItems = carrito.items!.map((item) => {
      return {
        producto: item.productoId,
        cantidad: item.cantidad
      };
    });
  }

  private _getPaises() {
    this.paises = this.usuariosService.getPaises();
  }

  volverAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  placePedido() {
    this.esEnviado = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const pedido: Pedido = {
      order_prods: this.pedidoItems,
      envio_direcc1: this.checkoutForm.calle.value,
      envio_direcc2: this.checkoutForm.apartamento.value,
      ciudad: this.checkoutForm.ciudad.value,
      cod_postal: this.checkoutForm.cod_postal.value,
      pais: this.checkoutForm.pais.value,
      telef: this.checkoutForm.telef.value,
      estado: 0,
      usuario: this.usuarioId,
      fecha_pedido: `${Date.now()}`
    };

    this.pedidosService.createPedido(pedido).subscribe(
      () => {
        //redirect to thank you page // payment
        this.carritoService.vaciarCarrito();
        this.router.navigate(['/exitoso']);
      },
      () => {
        //display some message to user
      }
    );
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
