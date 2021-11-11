import { CompraItem } from './compra-item';
import { Usuario } from '@bluebits/usuarios';

export class Compra {
  id?: string;
  compra_prods?: CompraItem[];
  image?: string;
  total_pagado?: string;
  proveedor?: string;
  nota?: string;
  dia?: string;
  mes?: string;
  anio?: number;
  usuario?: any;
  fecha_create?: string;
}
