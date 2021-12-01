import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardTwo, JwtInterceptor, UsuariosModule } from '@bluebits/usuarios';


import { PanelComponent } from './pages/panel/panel.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriasListComponent } from '../app/pages/categorias/categorias-list/categorias-list.component';
import { CategoriaFormComponent } from '../app/pages/categorias/categoria-form/categoria-form.component';
import { ProductosListComponent } from './pages/productos/productos-list/productos-list.component';
import { ProductosFormComponent } from './pages/productos/productos-form/productos-form.component';
import { UsuariosListComponent } from './pages/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from './pages/usuarios/usuarios-form/usuarios-form.component';
import { PedidosDetalleComponent } from './pages/pedidos/pedidos-detalle/pedidos-detalle.component';
import { PedidosListaComponent } from './pages/pedidos/pedidos-lista/pedidos-lista.component';

import { StockListaPageComponent } from './pages/producto_stock/stock_lista/stock_lista.component';
import { StockDetallePageComponent } from './pages/producto_stock/stock_detalle/stock_detalle.component';
import { ProductosImgComponent } from './pages/productos/productos-img/productos-img.component';
import { ComprasListaComponent } from './pages/compras/compras-list/compras-lista.component';
import { ComprasFormComponent } from './pages/compras/compras-form/compras-form.component';
import { ComprasRegistroFormComponent } from './pages/compras/compras-actualizar/compras-act.component';
import { ProductosKardexListComponent } from './pages/kardex/productos_lista/productos_lita.component';
import { ProductosKardexDetallesComponent } from './pages/kardex/detalle_kardex/detalle_kardex.component';

import { ReporteListaComponent } from './pages/reporte/reporte-list/reporte-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuardTwo],
    children: [
      {
        path: '',
        component: PanelComponent,
      },
      {
        path: 'categorias',
        component: CategoriasListComponent,
      },
      {
        path: 'categorias/form',
        component: CategoriaFormComponent,
      },
      {
        path: 'categorias/form/:id',
        component: CategoriaFormComponent
      },
      {
        path: 'usuarios',
        component: UsuariosListComponent
      },
      {
        path: 'usuarios/form',
        component: UsuariosFormComponent
      },
      {
        path: 'usuarios/form/:id',
        component: UsuariosFormComponent
      },
      {
        path: 'productos',
        component: ProductosListComponent
      },
      {
        path: 'productos/form',
        component: ProductosFormComponent
      },
      {
        path: 'productos/form/:id',
        component: ProductosFormComponent
      },
      {
        path: 'compras',
        component: ComprasListaComponent
      },
      {
        path: 'compras/form',
        component: ComprasRegistroFormComponent
      },
      {
        path: 'compras/:id',
        component: ComprasFormComponent
      },
      {
        path: 'productos/img/:id',
        component: ProductosImgComponent
      },
      {
        path: 'productos_stock',
        component: StockListaPageComponent
      },
      {
        path: 'productos_stock/form',
        component: StockDetallePageComponent
      },
      {
        path: 'productos_stock/form/:id',
        component: StockDetallePageComponent
      },
      {
        path: 'pedidos',
        component: PedidosListaComponent
      },
      {
        path: 'pedidos/:id',
        component: PedidosDetalleComponent
      },
      {
        path: 'productos_kardex',
        component: ProductosKardexListComponent
      },
      {
        path: 'producto_kardex/:id',
        component: ProductosKardexDetallesComponent
      },{
        path: 'ventas_reporte',
        component: ReporteListaComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
