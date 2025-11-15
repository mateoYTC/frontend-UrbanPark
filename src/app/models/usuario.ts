export interface Usuario {
  id: number;
  Nombre: string;
  Carro: string;
  Cedula: string;
  Placa: string;
  Registro_Entrada: Date | null;
  Registro_Salida: Date | null;
  Reserva: Date | null;
  Celular?: string;
  Email?: string;
}