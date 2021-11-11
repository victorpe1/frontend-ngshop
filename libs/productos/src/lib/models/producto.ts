import { Categoria } from './categoria';

export class Producto {
  _id?: string;
  nombre?: string;
  descripcion?: string;
  grande_descripcion?: string;
  image?: string;
  images?: string[];
  marca?: string;
  precio?: number;
  categoria?: Categoria;
  cont_stock?: number;
  calificacion?: number;
  numReviews?: number;
  destacado?: boolean;
  fecha_creacion?: string;
}

export class Producto2 {
  id?: string;
  cont_stock?: number;
}


