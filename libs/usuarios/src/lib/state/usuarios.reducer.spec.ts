import { UsuariosEntity } from './usuarios.models';
import * as UsuariosActions from './usuarios.actions';
import { State, initialState, reducer } from './usuarios.reducer';

describe('Usuarios Reducer', () => {
  const createUsuariosEntity = (id: string, name = ''): UsuariosEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Usuarios actions', () => {
    it('loadUsuariosSuccess should return set the list of known Usuarios', () => {
      const usuarios = [
        createUsuariosEntity('PRODUCT-AAA'),
        createUsuariosEntity('PRODUCT-zzz'),
      ];
      const action = UsuariosActions.loadUsuariosSuccess({ usuarios });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
