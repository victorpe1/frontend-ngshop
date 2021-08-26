import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosBuscarComponent } from './components/productos-buscar/productos-buscar.component';
import { ProductosItemComponent } from './components/productos-item/productos-item.component';
import { ProductosDestacadoComponent } from './components/productos-destacado/productos-destacado.component';
import { CategoriaBannerComponent } from './components/categoria-banner/categoria-banner.component';
import { ButtonModule } from 'primeng/button';
import { PedidosModule } from '@bluebits/pedidos';
import { RouterModule, Routes } from '@angular/router';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { ProductosListaComponent } from './pages/productos-lista/productos-lista.component';

import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@bluebits/ui';
const routes: Routes = [
  {
    path: 'productos',
    component: ProductosListaComponent
  },
  {
    path: 'categorias/:categoriaId',
    component: ProductosListaComponent
  },
  {
    path: 'productos/:productoId',
    component: ProductoPageComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    PedidosModule,
    RouterModule,
    UiModule,
    ButtonModule,
    RouterModule.forChild(routes),
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
  ],
  declarations: [
    ProductosBuscarComponent,
    ProductosItemComponent,
    ProductosDestacadoComponent,
    CategoriaBannerComponent,
    ProductoPageComponent,
    ProductosListaComponent
  ],
  exports: [
    ProductosBuscarComponent,
    CategoriaBannerComponent,
    ProductosItemComponent,
    ProductosDestacadoComponent,
    ProductoPageComponent,
    ProductosListaComponent
  ]
})
export class ProductosModule {}
