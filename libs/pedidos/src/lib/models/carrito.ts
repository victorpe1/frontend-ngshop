export class Carrito {
  items?: CarritoItem[];
}

export class CarritoItem {
  productoId?: string;
  cantidad?: number;
}

export class CarritoItemDetallado{
  producto?: any;
  cantidad?: number;
}

export class CarritoItemDetalladoPaypal{
  name?: string;
  category?: string;
  quantity?: string;
  unit_amount?: any;
}
