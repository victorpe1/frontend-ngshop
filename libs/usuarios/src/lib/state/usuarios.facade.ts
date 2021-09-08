import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as UsuariosActions from './usuarios.actions';
import * as UsuariosSelectors from './usuarios.selectors';

@Injectable()
export class UsuariosFacade {

  currentUsuario$ = this.store.pipe(select(UsuariosSelectors.getUsuario))

  isAuth$ = this.store.pipe(select(UsuariosSelectors.getUsuarioIsAuth))

  constructor(private store: Store) {}



   buildUsuarioSession() {
    this.store.dispatch(UsuariosActions.buildUsuarioSession());
  }
}
