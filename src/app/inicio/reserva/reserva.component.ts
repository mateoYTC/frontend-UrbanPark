import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ReservaService } from '../../services/reserva.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Reserva } from '../../models/Reserva';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  fechaEntrada: string = '';
  fechaSalida: string = '';
  tipoVehiculo: 'carro' | 'moto' = 'carro';
  placa: string = '';
  
  nombres: string = '';
  apellidos: string = '';
  celular: string = '';
  email: string = '';
  cedula: string = '';

  pasoActual: number = 1;
  tarifaCalculada: any = null;
  errorMessage: string = '';
  usuarioExistente: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  calcularTarifa() {
    if (!this.fechaEntrada || !this.fechaSalida || !this.placa) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    const entrada = new Date(this.fechaEntrada);
    const salida = new Date(this.fechaSalida);
    const ahora = new Date();

    
    if (entrada >= salida) {
      this.errorMessage = 'La fecha de salida debe ser posterior a la de entrada';
      return;
    }

    
    if (entrada < ahora) {
      this.errorMessage = 'La reserva debe ser para una fecha futura';
      return;
    }

    
    this.errorMessage = '';
    this.tarifaCalculada = this.reservaService.calcularTarifa(
      this.fechaEntrada, 
      this.fechaSalida, 
      this.tipoVehiculo
    );
  }

  avanzarPaso1() {
    if (!this.tarifaCalculada) {
      this.calcularTarifa();
      return;
    }
    this.pasoActual = 2;
  }

  buscarUsuario() {
    if (!this.cedula) {
      this.errorMessage = 'Ingrese su cédula para buscar';
      return;
    }

    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarioExistente = usuarios.find(u => u.Cedula === this.cedula) || null;
      
      if (this.usuarioExistente) {
        const nombreParts = this.usuarioExistente.Nombre.split(' ');
        this.nombres = nombreParts[0] || '';
        this.apellidos = nombreParts.slice(1).join(' ') || '';
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Usuario no encontrado. Complete sus datos.';
      }
    });
  }

  avanzarPaso2() {
    if (!this.nombres || !this.apellidos || !this.celular || !this.email) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    if (!this.validarEmail(this.email)) {
      this.errorMessage = 'Ingrese un email válido';
      return;
    }

    this.errorMessage = '';
    this.pasoActual = 3;
  }

  retrocederPaso() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
      this.errorMessage = '';
    }
  }

  confirmarReserva(aceptaTerminos: boolean, aceptaNotificaciones: boolean) {
    if (!aceptaTerminos) {
      this.errorMessage = 'Debe aceptar los términos y condiciones';
      return;
    }

    const usuarioData: Usuario = {
      id: this.usuarioExistente?.id || 0,
      Nombre: `${this.nombres} ${this.apellidos}`.trim(),
      Cedula: this.cedula,
      Carro: this.tipoVehiculo === 'carro' ? 'Automóvil' : 'Motocicleta',
      Placa: this.placa.toUpperCase(),
      Reserva: new Date(),
      Registro_Entrada: null,
      Registro_Salida: null,
      Celular: this.celular,
      Email: this.email
    };

    const operacionUsuario = this.usuarioExistente 
      ? this.usuarioService.putUsuario(this.usuarioExistente.id, usuarioData)
      : this.usuarioService.crearUsuarioCompleto(usuarioData);

    operacionUsuario.subscribe((usuarioGuardado: Usuario) => {
      const reservaData: Reserva = {
        idUsuario: usuarioGuardado.id,
        placaVehiculo: this.placa.toUpperCase(),
        tipoVehiculo: this.tipoVehiculo,
        fechaEntrada: this.fechaEntrada,
        fechaSalida: this.fechaSalida,
        horasTotales: this.tarifaCalculada.horas_totales,
        diasTotales: this.tarifaCalculada.dias_totales,
        subtotal: this.tarifaCalculada.subtotal,
        descuento: this.tarifaCalculada.descuento,
        total: this.tarifaCalculada.total,
        estado: 'confirmada',
        created_at: new Date().toISOString()
      };

      this.reservaService.crearReserva(reservaData).subscribe(() => {
        
        localStorage.setItem('comprobanteReserva', JSON.stringify({
          usuario: usuarioGuardado,
          reserva: reservaData,
          tarifa: this.tarifaCalculada
        }));
        
        
        this.cerrarModal();
        
        
        this.router.navigate(['/comprobante']);
      }, error => {
        this.errorMessage = 'Error al crear la reserva';
        console.error(error);
      });
    }, error => {
      this.errorMessage = 'Error al guardar datos del usuario';
      console.error(error);
    });
  }

  
  cerrarModal() {
    const modal = document.getElementById('ReservaModal');
    if (modal) {
      
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
      
      
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      
      
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }

  get mostrarTarifa(): string {
    const tarifas = {
      moto: '$15.000 día',
      carro: '$25.000 día'
    };
    return tarifas[this.tipoVehiculo];
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}