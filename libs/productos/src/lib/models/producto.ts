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

export class KardexProducto {
  detalle?: string;
  fecha_create?: string;
  id_compra?: any;
  cantidad_compra?: any;
  precio_compra?: any;
  valor_total_compra?: any;
  id_venta?: any;
  cantidad_venta?: any;
  precio_venta?: any;
  valor_total_venta?: any;
  cantidad_existencia?: any;
  precio_existencia?: any;
  valor_total_existencia?: any;
}
