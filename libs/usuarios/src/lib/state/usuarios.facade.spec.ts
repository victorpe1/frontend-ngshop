import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { UsuariosEntity } from './usuarios.models';
import { UsuariosEffects } from './usuarios.effects';
import { UsuariosFacade } from './usuarios.facade';

import * as UsuariosSelectors from './usuarios.selectors';
import * as UsuariosActions from './usuarios.actions';
import {
  USUARIOS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './usuarios.reducer';

interface TestSchema {
  usuarios: State;
}

describe('UsuariosFacade', () => {
  let facade: UsuariosFacade;
  let store: Store<TestSchema>;
  const createUsuariosEntity = (id: string, name = ''): UsuariosEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(USUARIOS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([UsuariosEffects]),
        ],
        providers: [UsuariosFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(UsuariosFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allUsuarios$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allUsuarios$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadUsuariosSuccess` to manually update list
     */
    it('allUsuarios$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allUsuarios$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          UsuariosActions.loadUsuariosSuccess({
            usuarios: [
              createUsuariosEntity('AAA'),
              createUsuariosEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allUsuarios$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
