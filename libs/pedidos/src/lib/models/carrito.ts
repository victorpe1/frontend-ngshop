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
