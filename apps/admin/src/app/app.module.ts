import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { PanelComponent } from './pages/panel/panel.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriasListComponent } from './pages/categorias/categorias-list/categorias-list.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { ProductosListComponent } from './pages/productos/productos-list/productos-list.component';
import { ProductosFormComponent } from './pages/productos/productos-form/productos-form.component'

import { AuthGuard, AuthGuardTwo, JwtInterceptor, UsuariosModule } from '@bluebits/usuarios';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from '@bluebits/ui';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';

import { InputMaskModule } from 'primeng/inputmask'
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriaService, ProductosService } from '@bluebits/productos';
import { UsuariosService } from '@bluebits/usuarios';

import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';

import { ProductosImgComponent } from './pages/productos/productos-img/productos-img.component';
import { StockListaPageComponent } from './pages/producto_stock/stock_lista/stock_lista.component';
import { StockDetallePageComponent } from './pages/producto_stock/stock_detalle/stock_detalle.component';

import { UsuariosFormComponent } from './pages/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './pages/usuarios/usuarios-list/usuarios-list.component';
import { PedidosListaComponent } from './pages/pedidos/pedidos-lista/pedidos-lista.component';
import { PedidosDetalleComponent } from './pages/pedidos/pedidos-detalle/pedidos-detalle.component';
import { PedidosModule, PedidosService } from '@bluebits/pedidos';
import { AuthService } from '@bluebits/usuarios';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';
import { ComprasListaComponent } from './pages/compras/compras-list/compras-lista.component';
import { ComprasFormComponent } from './pages/compras/compras-form/compras-form.component';
import { ComprasRegistroFormComponent } from './pages/compras/compras-actualizar/compras-act.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  ColorPickerModule,
  TagModule,
  InputMaskModule,
  InputNumberModule,
  DropdownModule,
  FieldsetModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule
];

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    ShellComponent,
    SidebarComponent,
    CategoriasListComponent,
    ComprasListaComponent,
    ComprasFormComponent,
    CategoriaFormComponent,
    ProductosListComponent,
    ProductosFormComponent,
    UsuariosFormComponent,
    UsuariosListComponent,
    PedidosListaComponent,
    PedidosDetalleComponent,
    StockListaPageComponent,
    StockDetallePageComponent,
    ProductosImgComponent,
    ComprasRegistroFormComponent
    ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    PedidosModule,
    UiModule,
    NgbModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51JbeGwApvJeofVU9F6eCVbkvHCyzJADJw4WLPgoWhStzQEN1W5qzonSeaVtFrR4l0mBSuicgiRXfurZ53V8N8aVd00pxvnrZFv'),
    UsuariosModule,
    ...UX_MODULE
  ],
  providers: [CategoriaService, MessageService, ProductosService, UsuariosService, ConfirmationService,
  PedidosService, AuthService,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],

  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
