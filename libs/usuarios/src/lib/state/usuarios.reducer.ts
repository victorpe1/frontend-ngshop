import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UsuariosActions from './usuarios.actions';
import { UsuariosEntity } from './usuarios.models';
import { Usuario } from '../models/usuario';

export const USUARIOS_FEATURE_KEY = 'usuarios';

export interface UsuariosState {
  usuario: Usuario | null;
  isAuth: boolean;
}

export interface UsuariosPartialState {
  readonly [USUARIOS_FEATURE_KEY]: UsuariosState;
}

export const initialUsuariosState: UsuariosState = {
  usuario: null,
  isAuth: false,
};

const usuariosReducer = createReducer(
  initialUsuariosState,
  on(UsuariosActions.buildUsuarioSession, (state) => ({ ...state })),
  on(UsuariosActions.buildUsuarioSessionExitoso, (state, action) => ({
    ...state,
    usuario: action.usuario,
    isAuth: true,
  })),
  on(UsuariosActions.buildUsuarioSessionFallo, (state) => ({
    ...state,
    usuario: null,
    isAuth: false,
  }))
);

export function reducer(state: UsuariosState | undefined, action: Action) {
  return usuariosReducer(state, action);
}
