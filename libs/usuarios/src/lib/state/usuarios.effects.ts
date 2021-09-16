import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as UsuariosActions from './usuarios.actions';
import { concat, of, pipe } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { catchError, concatMap, map } from 'rxjs/operators';
import { UsuariosService } from '../services/usuario.service';


@Injectable()
export class UsuariosEffects {

  constructor(private actions$: Actions,
    private localstorageService: LocalstorageService,
    private usuariosService: UsuariosService) {}

  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(ofType(UsuariosActions.buildUsuarioSession), concatMap(() => {

    const usuarioId = this.localstorageService.getUserIdFromToken();


    if(this.localstorageService.isValidToken()){

      if(usuarioId){
        return this.usuariosService.getUsuario(usuarioId).pipe(
        map((usuario) => {
          return UsuariosActions.buildUsuarioSessionExitoso({usuario: usuario});
        }),
        catchError(() => of(UsuariosActions.buildUsuarioSessionFallo()))
        );
      }else{
        return of(UsuariosActions.buildUsuarioSessionFallo());
      }
    }else{
      return of(UsuariosActions.buildUsuarioSessionFallo());
    }
    }))
  );
}
