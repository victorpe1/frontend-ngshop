import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ToastModule } from 'primeng/toast';
import { UiModule } from '@bluebits/ui';
import { NavComponent } from './shared/nav/nav.component';
import { AccordionModule } from 'primeng/accordion';
import { ProductosModule } from '@bluebits/productos';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PedidosModule } from '@bluebits/pedidos';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';
import { JwtInterceptor, UsuariosModule } from '@bluebits/usuarios';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent
  ],
  imports: [AppRoutingModule,
    BrowserModule,
    UiModule,
    BrowserAnimationsModule,
    AccordionModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    PedidosModule,
    ProductosModule,
    HttpClientModule,
    UsuariosModule,
    ToastModule],
  providers: [MessageService, { provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
