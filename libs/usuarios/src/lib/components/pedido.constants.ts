export const ORDER_STATUS:
{ [key: string]: { label: string; color: string } }
    = {
  0: {
    label: 'Pendiente',
    color: 'primary'
  },
  1: {
    label: 'Procesado',
    color: 'warning'
  },
  2: {
    label: 'Entregado',
    color: 'warning'
  },
  3: {
    label: 'Enviado',
    color: 'success'
  },
  4: {
    label: 'Falló',
    color: 'danger'
  }
};
