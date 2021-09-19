import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsuarios from './state/usuarios.reducer';
import { UsuariosEffects } from './state/usuarios.effects';
import { UsuariosFacade } from './state/usuarios.facade';
import { PerfilPageComponent } from './components/perfil-page/perfil-page.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromUsuarios.USUARIOS_FEATURE_KEY,
      fromUsuarios.reducer
    ),
    EffectsModule.forFeature([UsuariosEffects]),
  ],
  declarations: [LoginComponent, PerfilPageComponent],
  providers: [UsuariosFacade],
})
export class UsuariosModule {}
