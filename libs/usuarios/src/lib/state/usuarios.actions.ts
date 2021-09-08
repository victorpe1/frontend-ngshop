import { Usuario } from '../models/usuario';
import { createAction, props } from '@ngrx/store';
import { UsuariosEntity } from './usuarios.models';

export const buildUsuarioSession = createAction('[Usuarios] Build Usuario Session');


export const init = createAction('[Usuarios Page] Init');

export const buildUsuarioSessionExitoso = createAction(
  '[Usuarios] Load Usuarios Success',
  props<{ usuario: Usuario }>()
);

export const buildUsuarioSessionFallo = createAction(
  '[Usuarios] Load Usuarios Failure'
);
