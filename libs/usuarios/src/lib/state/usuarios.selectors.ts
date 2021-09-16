import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsuariosPartialState, UsuariosState, USUARIOS_FEATURE_KEY } from './usuarios.reducer';

export const getUsuariosState = createFeatureSelector<UsuariosState>(USUARIOS_FEATURE_KEY);

export const getUsuario = createSelector(getUsuariosState, (state) => state.usuario);

export const getUsuarioIsAuth = createSelector(getUsuariosState, (state) => state.isAuth);
