import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comprobante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css']
})
export class ComprobanteComponent implements OnInit {
  reservaData: any = null;
  codigoReserva: string = '';
  fechaActual: string = new Date().toISOString();
  
 
  pagoRealizado: boolean = false;
  metodoPago: string = 'tarjeta';
  numeroTarjeta: string = '';
  fechaExpiracion: string = '';
  cvv: string = '';
  procesandoPago: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('comprobanteReserva');
    if (data) {
      this.reservaData = JSON.parse(data);
      this.generarCodigoReserva();
      
      
      if (this.reservaData.reserva.estado === 'pagada') {
        this.pagoRealizado = true;
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  generarCodigoReserva() {
    if (this.reservaData) {
      const placa = this.reservaData.reserva.placaVehiculo;
      const fecha = new Date().getTime().toString().slice(-4);
      this.codigoReserva = `${placa}-${fecha}`.toUpperCase();
    }
  }

  procesarPago() {
    
    if (this.metodoPago === 'tarjeta') {
      if (!this.numeroTarjeta || !this.fechaExpiracion || !this.cvv) {
        alert('❌ Por favor complete toda la información de la tarjeta');
        return;
      }
      
      
      if (this.numeroTarjeta.replace(/\s/g, '').length !== 16) {
        alert('❌ El número de tarjeta debe tener 16 dígitos');
        return;
      }
      
      
      if (!/^\d{2}\/\d{2}$/.test(this.fechaExpiracion)) {
        alert('❌ Formato de fecha inválido. Use MM/AA');
        return;
      }
      
      
      if (!/^\d{3}$/.test(this.cvv)) {
        alert('❌ El CVV debe tener 3 dígitos');
        return;
      }
    }

   
    this.procesandoPago = true;

    
    setTimeout(() => {
      this.pagoRealizado = true;
      this.procesandoPago = false;
      
      
      if (this.reservaData) {
        this.reservaData.reserva.estado = 'pagada';
        localStorage.setItem('comprobanteReserva', JSON.stringify(this.reservaData));
      }
      
      
      let mensaje = '';
      switch (this.metodoPago) {
        case 'tarjeta':
          mensaje = '✅ Pago con tarjeta procesado exitosamente!\nSu reserva ha sido confirmada.';
          break;
        case 'pse':
          mensaje = '✅ Pago via PSE completado exitosamente!\nSu reserva ha sido confirmada.';
          break;
        case 'efectivo':
          mensaje = '✅ Reserva confirmada para pago en efectivo!\nPresente este comprobante al ingresar.';
          break;
      }
      
      alert(mensaje);
    }, 3000); 
  }

  formatearNumeroTarjeta(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    
    
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    
    this.numeroTarjeta = value;
  }

  formatearFechaExpiracion(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    this.fechaExpiracion = value;
  }

  formatearCVV(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
   
    if (value.length > 3) {
      value = value.substring(0, 3);
    }
    
    this.cvv = value;
  }

  descargarComprobante() {
    window.print();
  }

  nuevaReserva() {
    localStorage.removeItem('comprobanteReserva');
    this.router.navigate(['/inicio']);
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  }

  
  get textoBotonPago(): string {
    if (this.procesandoPago) {
      return '⏳ Procesando...';
    }
    
    switch (this.metodoPago) {
      case 'efectivo':
        return '✅ Confirmar Reserva';
      case 'tarjeta':
        return '💳 Proceder al Pago';
      case 'pse':
        return '🌐 Pagar con PSE';
      default:
        return '💳 Proceder al Pago';
    }
  }

  
  get botonPagoDeshabilitado(): boolean {
    return this.procesandoPago;
  }

  
  get claseBotonPago(): string {
    if (this.procesandoPago) {
      return 'btn btn-secondary btn-lg px-5';
    }
    return 'btn btn-success btn-lg px-5';
  }

  
  calcularIVA(): number {
    if (this.reservaData) {
      return this.reservaData.reserva.subtotal * 0.19;
    }
    return 0;
  }

  
  calcularTotalConIVA(): number {
    if (this.reservaData) {
      return this.reservaData.reserva.subtotal + this.calcularIVA();
    }
    return 0;
  }
}