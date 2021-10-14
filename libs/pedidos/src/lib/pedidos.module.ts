import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from './services/carrito.service';
import { BadgeModule } from 'primeng/badge';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CarritoIconComponent } from './components/carrito-icon/carrito-icon.component';
import { CarritoResumenComponent } from './components/carrito-resumen/carrito-resumen.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { CarritoCheckoutComponent } from './pages/carrito-checkout/carrito-checkout.component';
import { GraciasCompraComponent } from './pages/gracias-compra/gracias-compra.component';
import { AuthGuard } from '@bluebits/usuarios';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './pages/popup/popup.component'
import { CompraService } from './services/compra-json.service';


const routes: Routes = [
  {
    path: 'carrito',
    component: CarritoCheckoutComponent
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    component: CarritoPageComponent
  },
  {
    path: 'exitoso',
    component: PopupComponent
  },
  {
    path: 'exitoso2',
    component: GraciasCompraComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    InputTextModule,
    NgbModule,
    InputMaskModule,
    DropdownModule
  ],
  declarations: [
    CarritoIconComponent,
    CarritoResumenComponent,
    CarritoPageComponent,
    CarritoCheckoutComponent,
    GraciasCompraComponent,
    PopupComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    CarritoIconComponent,
    CarritoResumenComponent, /*pedido resumen*/
    CarritoPageComponent,
    CarritoCheckoutComponent,
    GraciasCompraComponent,
    PopupComponent
  ],
})
export class PedidosModule {

  constructor(carritoService: CarritoService, compraService: CompraService) {
    carritoService.initCarritoLocalStorage();
    compraService.initCompraLocalStorage();
  }

}
