import { PedidoItem } from './pedido-item';
import { Usuario } from '@bluebits/usuarios';

export class Pedido {
  id?: string;
  order_prods?: PedidoItem[];
  envio_direcc1?: string;
  envio_direcc2?: string;
  ciudad?: string;
  cod_postal?: string;
  pais?: string;
  telef?: string;
  estado?: number;
  totalPrecio?: string;
  usuario?: any;
  fecha_pedido?: string;
}

export class PedidoReporteDate {
  id?: string;
  order_prods?: PedidoItem[];
  envio_direcc1?: string;
  envio_direcc2?: string;
  ciudad?: string;
  cod_postal?: string;
  pais?: string;
  telef?: string;
  estado?: number;
  totalPrecio?: string;
  usuario?: any;
  fecha_pedido?: string;
  date?: Date;
}

