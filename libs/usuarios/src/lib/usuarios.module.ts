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
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
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
  imports: [
    CommonModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromUsuarios.USUARIOS_FEATURE_KEY,
      fromUsuarios.reducer
    ),
    EffectsModule.forFeature([UsuariosEffects]),
    ...UX_MODULE
  ],
  declarations: [LoginComponent, PerfilPageComponent],
  providers: [UsuariosFacade, MessageService, ConfirmationService],
})
export class UsuariosModule {}
