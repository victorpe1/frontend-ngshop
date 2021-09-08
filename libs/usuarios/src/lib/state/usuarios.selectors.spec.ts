import { UsuariosEntity } from './usuarios.models';
import {
  usuariosAdapter,
  UsuariosPartialState,
  initialState,
} from './usuarios.reducer';
import * as UsuariosSelectors from './usuarios.selectors';

describe('Usuarios Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUsuariosId = (it: UsuariosEntity) => it.id;
  const createUsuariosEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as UsuariosEntity);

  let state: UsuariosPartialState;

  beforeEach(() => {
    state = {
      usuarios: usuariosAdapter.setAll(
        [
          createUsuariosEntity('PRODUCT-AAA'),
          createUsuariosEntity('PRODUCT-BBB'),
          createUsuariosEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Usuarios Selectors', () => {
    it('getAllUsuarios() should return the list of Usuarios', () => {
      const results = UsuariosSelectors.getAllUsuarios(state);
      const selId = getUsuariosId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = UsuariosSelectors.getSelected(state) as UsuariosEntity;
      const selId = getUsuariosId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getUsuariosLoaded() should return the current 'loaded' status", () => {
      const result = UsuariosSelectors.getUsuariosLoaded(state);

      expect(result).toBe(true);
    });

    it("getUsuariosError() should return the current 'error' state", () => {
      const result = UsuariosSelectors.getUsuariosError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
