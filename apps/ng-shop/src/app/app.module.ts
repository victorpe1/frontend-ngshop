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
import { HttpClientModule } from '@angular/common/http';
import { PedidosModule } from '@bluebits/pedidos';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';

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
    PedidosModule,
    ProductosModule,
    HttpClientModule,
    ToastModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
