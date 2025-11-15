import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/Reserva';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = environment.urlApiBase + 'reservas';

  constructor(private http: HttpClient) {}

  
  private tarifas = {
    moto: { hora: 3500, dia: 15000 },
    carro: { hora: 4000, dia: 25000 }
  };

  calcularTarifa(fechaEntrada: string, fechaSalida: string, tipoVehiculo: 'carro' | 'moto'): any {
    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);
    
   
    const diffMs = salida.getTime() - entrada.getTime();
    const horasTotales = Math.ceil(diffMs / (1000 * 60 * 60));
    const diasTotales = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    const tarifa = this.tarifas[tipoVehiculo];
    let subtotal = 0;
    
    
    if (diasTotales >= 1) {
      subtotal += diasTotales * tarifa.dia;
      
      const horasExtras = horasTotales - (diasTotales * 24);
      if (horasExtras > 0) {
        subtotal += horasExtras * tarifa.hora;
      }
    } else {
      
      subtotal += horasTotales * tarifa.hora;
    }
    
    
    const total = subtotal;
    
    return {
      horas_totales: horasTotales,
      dias_totales: diasTotales,
      subtotal: Math.round(subtotal),
      descuento: 0,
      total: Math.round(total),
      tarifa_aplicada: tarifa
    };
  }

  crearReserva(reservaData: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reservaData);
  }

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  getReservaPorId(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  actualizarReserva(id: number, reservaData: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reservaData);
  }

  cancelarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  getReservasPorUsuario(idUsuario: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }


  getReservasActivas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/estado/confirmada`);
  }
}