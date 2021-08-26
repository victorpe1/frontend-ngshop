import { NgModule } from '@angular/core';
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

const routes: Routes = [
  {
    path: 'carrito',
    component: CarritoPageComponent
  },
  {
    path: 'checkout',
    component: CarritoCheckoutComponent
  },
  {
    path: 'exitoso',
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
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule
  ],
  declarations: [
    CarritoIconComponent,
    CarritoResumenComponent,
    CarritoPageComponent,
    CarritoCheckoutComponent,
    GraciasCompraComponent
  ],
  exports: [
    CarritoIconComponent,
    CarritoResumenComponent, /*pedido resumen*/
    CarritoPageComponent,
    CarritoCheckoutComponent,
    GraciasCompraComponent
  ],
})
export class PedidosModule {
  constructor(carritoService: CarritoService) {
    carritoService.initCarritoLocalStorage();
  }

}
