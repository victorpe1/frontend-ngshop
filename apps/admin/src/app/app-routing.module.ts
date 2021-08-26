import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, JwtInterceptor, UsuariosModule } from '@bluebits/usuarios';


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


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
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
        path: 'pedidos',
        component: PedidosListaComponent
      },
      {
        path: 'pedidos/:id',
        component: PedidosDetalleComponent
      }
    ],
  },
  {
     path: '**',
     redirectTo: '',
     pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
