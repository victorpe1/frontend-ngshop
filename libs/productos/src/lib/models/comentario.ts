import { Producto } from './producto';
import { Usuario } from '@bluebits/usuarios';

export class Comentario {
  _id?: string;
  producto?: Producto;
  usuario?: any;
  comentario?: string;
  estrellas?: number;
  fchaCreacion?: string;
}
