
export class CompraGuardado {
  items?: CompraGuardadoItem[];
}

export class CompraGuardadoItem {
  productoId?: string;
  cantidad?: number;
  precio_compra?: number;
  detalle?: string;
}

export class CompraGuardadoItemDetallado{
  producto?: any;
  cantidad?: number;
  precio_compra?: number;
  detalle?: string;
}
