import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UsuariosService } from '@bluebits/usuarios';
import { Carrito } from '../../models/carrito';
import { Pedido } from '../../models/pedido';
import { PedidoItem } from '../../models/pedido-item';
import { CarritoService } from '../../services/carrito.service';
import { PedidosService } from '../../services/pedidos.service';
import { PEDIDO_STATUS } from '../../pedidos.constants';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from '@env/environment';
import {
  CarritoItemDetallado,
  CarritoItemDetalladoPaypal,
} from '../../models/carrito';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { PopupComponent } from '../popup/popup.component';
import { GraciasCompraComponent } from './../gracias-compra/gracias-compra.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Producto } from 'libs/productos/src/lib/models/producto';
import { ProductosService } from './../../../../../productos/src/lib/services/producto.service';

@Component({
  selector: 'pedidos-carrito-page',
  templateUrl: './carrito-page.component.html',
  styles: [],
})
export class CarritoPageComponent implements OnInit, OnDestroy {
  public payPalConfig?: IPayPalConfig;

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private carritoService: CarritoService,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private spinner: NgxSpinnerService
  ) {}

  checkoutFormGroup!: FormGroup;
  esEnviado = false;
  pedidoItems: PedidoItem[] = [];
  items: any[] = [];
  carritoItemDetallado: CarritoItemDetallado[] = [];
  usuarioId!: string;
  paises: any;
  endSubs$: Subject<any> = new Subject();
  precioTotal!: number;
  carritoCont = 0;
  productos: Producto[] = [];

  ngOnInit(): void {
    this.initConfig();
    this._getProductos();
    this._initCheckoutForm();
    this._getCarritoItems();
    this._getPaises();
    this._autoFillUserData();
    this._getPedidoResumen();
    this._getCarritoDetalle();

  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  _getPedidoResumen() {
    this.carritoService.carrito$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((carrito) => {
        this.precioTotal = 0;
        if (carrito) {
          carrito.items!.map((item) => {
            this.pedidosService
              .getProducto(item.productoId!)
              .pipe(take(1))
              .subscribe((producto) => {
                this.precioTotal += producto.precio * item.cantidad!;
              });
          });
        }
      });
  }

  private _getCarritoDetalle() {
    this.carritoService.carrito$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((respuestaCarrito) => {
        this.carritoCont = respuestaCarrito?.items!.length ?? 0;

        respuestaCarrito.items!.forEach((carritoitem) => {
          this.pedidosService
            .getProducto(carritoitem.productoId!)
            .subscribe((respProduct) => {
              this.items.push({
                name: respProduct.nombre,
                //category: respProduct.categoria.nombre,
                quantity: carritoitem.cantidad,
                unit_amount: {
                  value: respProduct.precio,
                  currency_code: 'USD',
                },
              });
              console.log(this.items);
            });
        });
      });
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
      calle: ['', Validators.required],
    });
  }

  private _autoFillUserData() {
    this.usuariosService
      .observeCurrentUsuario()
      .pipe(takeUntil(this.endSubs$))
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
        cantidad: item.cantidad,
      };
    });
  }

  private _getPaises() {
    this.paises = this.usuariosService.getPaises();
  }

  volverAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  initConfig(): void {


    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AVffHSlUocstJcrjbYbtXtBl37o_z3EhBexK_oyNXEStxZKeVRbKxgZ2Sq5umFEw9o3dIZz95Dv6yjWK',

      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.precioTotal.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.precioTotal.toString(),
                  },
                },
              },
              items: this.items,
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        this.spinner.show();

        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',

          JSON.stringify(data)
        );

        this.preVentaCancelar();
        this.placePedido(data);
      },
      onCancel: (data, actions) => {

        this.preVentaCancelar();
        console.log('BORRARXd', data, actions);
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {

        this.preVentaCancelar();
        console.log('OnError', err);
      },
      onClick: (data, actions) => {

        let comprobar_stock = this.preVentaVerificar();

        console.log(comprobar_stock)

        if(comprobar_stock == false){
          window.location.href = "/error_stock";

        }else{
          console.log("RESTAR")
          this.restarStockPedido();
        }

        console.log('onClick', data, actions);
      },
    };

  }

  private _getProductos() {
    this.productosService
      .getProductos()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((productos) => {
        this.productos = productos;
      });
  }

  preVentaVerificar(): Boolean{

    let flgConforme = true;

    this.pedidoItems.map((item) => {
    //buscar producto x pedido
    this.productos.map((producto) => {
        if(item.producto == producto._id){
           let stock_reducido_comprobar;
           stock_reducido_comprobar = producto.cont_stock! - item.cantidad!;

           console.log(stock_reducido_comprobar)

           if(stock_reducido_comprobar < 0){
              flgConforme = false;
           }
        }
      });
    });

    return flgConforme;
  }

  restarStockPedido(){
    const pedido: Pedido = {
      order_prods: this.pedidoItems
    };

    console.log(pedido)
    this.pedidosService.prePedidoResta(pedido);
  }


  preVentaCancelar(){
    const pedido: Pedido = {
      order_prods: this.pedidoItems
    };

    console.log("SUMAR STOCK")
    this.pedidosService.prePedidoCancelacion(pedido);
  }


  placePedido(data: any) {
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
      fecha_pedido: `${Date.now()}`,
    };

    console.log(pedido);

    this.pedidosService.createPedido(pedido).subscribe(
      () => {
        const navigationExtras: NavigationExtras = {
          state: {
            items: data.purchase_units[0].items,
            value: data.purchase_units[0].amount.value,
          },
        };

        this.carritoService.vaciarCarrito();

        this.spinner.hide();

        this.router.navigate(['/exitoso2'], navigationExtras);
      },
      () => {
        //display some message to user
      }
    );
  }

  placePedidoStripe() {
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

    this.pedidosService.cachePedidoData(pedido);


    /*this.pedidosService
      .crearCheckOutSession(this.pedidoItems)
      .subscribe((error) => {
        if (error) {
          console.log('ERROR');
        }
      });*/



  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
