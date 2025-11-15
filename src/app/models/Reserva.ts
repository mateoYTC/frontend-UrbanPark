export interface Reserva {
  id?: number;
  idUsuario: number;
  placaVehiculo: string;
  tipoVehiculo: 'carro' | 'moto';
  fechaEntrada: string;
  fechaSalida: string;
  horasTotales: number;
  diasTotales: number;
  subtotal: number;
  descuento: number;
  total: number;
  estado: 'pendiente' | 'confirmada' | 'activa' | 'completada' | 'cancelada';
  created_at?: string;
}