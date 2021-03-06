import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { JwtInterceptor, UsuariosModule, UsuariosService } from '@bluebits/usuarios';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent,
  ],
  imports: [AppRoutingModule,
    BrowserModule,
    UiModule,
    BrowserAnimationsModule,
    AccordionModule,
    NgxSpinnerModule,
    NgxPayPalModule,
    NgbModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    PedidosModule,
    ProductosModule,
    HttpClientModule,
    UsuariosModule,
    NgxStripeModule.forRoot('pk_test_51JbeGwApvJeofVU9F6eCVbkvHCyzJADJw4WLPgoWhStzQEN1W5qzonSeaVtFrR4l0mBSuicgiRXfurZ53V8N8aVd00pxvnrZFv'),
    ToastModule],
  providers: [MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
