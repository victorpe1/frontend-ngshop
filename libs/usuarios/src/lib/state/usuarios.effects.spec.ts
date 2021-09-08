import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { UsuariosEffects } from './usuarios.effects';
import * as UsuariosActions from './usuarios.actions';

describe('UsuariosEffects', () => {
  let actions: Observable<any>;
  let effects: UsuariosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UsuariosEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UsuariosEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UsuariosActions.init() });

      const expected = hot('-a-|', {
        a: UsuariosActions.loadUsuariosSuccess({ usuarios: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
