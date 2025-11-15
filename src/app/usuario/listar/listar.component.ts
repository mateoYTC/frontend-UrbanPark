import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { UtilityService } from '../../services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  @ViewChild('pagarModal') pagarModal!: ElementRef;
  
  formPago!: FormGroup;
  usuarioAEliminar: Usuario | undefined = undefined;

  ngOnInit() {
    this.formPago = this.fb.group({
      metodo: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(1000)]],
    });
  }

  realizarPago() {
    if (this.formPago.invalid) {
      this.formPago.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor seleccione un método y un valor válido.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const { metodo, valor } = this.formPago.value;

    Swal.fire({
      icon: 'success',
      title: 'Pago exitoso 🎉',
      html: `Has pagado <b>$${valor}</b> por <b>${metodo.toUpperCase()}</b>.`,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      this._util.cerrarModal(this.pagarModal);
      this.formPago.reset();
    });
  }

  @ViewChild('cuModal') modal: ElementRef | undefined;
  VectorUser: Usuario[] = [];
  isLoading = true;
  usuarioSeleccion: Usuario | undefined = undefined;
  isNew: boolean = false;

  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService, private _util: UtilityService) {
    this.LoadUsuarios();
  }

  LoadUsuarios() {
    this.isLoading = true;
    this._usuarioService.getUsuarios()
      .subscribe((rs) => {
        this.VectorUser = rs;
        this.isLoading = false;
      });
  }

  editarUsuario(usuario: Usuario) {
    this.isNew = false;
    this.usuarioSeleccion = usuario;
  }

  nuevoUsuario() {
    this.isNew = true;
    this.usuarioSeleccion = {
      Nombre: "", Carro: "", Cedula: "", Placa: "", 
      Registro_Entrada: null, Registro_Salida: null, Reserva: null
    } as Usuario;
  }

  registrarEntrada(usuario: Usuario) {
    const usuarioActualizado = { ...usuario };
    usuarioActualizado.Registro_Entrada = new Date();

    this._usuarioService.putUsuario(usuarioActualizado.id, usuarioActualizado).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Entrada registrada correctamente' });
        this.LoadUsuarios();
      },
      error: () => {
        Swal.fire({ icon: 'error', title: 'Error al registrar la entrada' });
      }
    });
  }

  registrarSalida(usuario: Usuario) {
    const usuarioActualizado = { ...usuario };
    usuarioActualizado.Registro_Salida = new Date();

    this._usuarioService.putUsuario(usuarioActualizado.id, usuarioActualizado).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Salida registrada correctamente' });
        this.LoadUsuarios();
      },
      error: () => {
        Swal.fire({ icon: 'error', title: 'Error al registrar la salida' });
      }
    });
  }

  guardarUsuario() {
    if (!this.usuarioSeleccion) return;

    if (this.isNew) {
      
      let proximoId = 1;
      if (this.VectorUser.length > 0) {
        const idsExistentes = this.VectorUser.map(u => u.id).sort((a, b) => a - b);
        
        
        for (let i = 0; i < idsExistentes.length; i++) {
          if (idsExistentes[i] !== i + 1) {
            proximoId = i + 1;
            break;
          }
        }
        
        
        if (proximoId === 1) {
          proximoId = Math.max(...idsExistentes) + 1;
        }
      }

      
      const usuarioConId = {
        ...this.usuarioSeleccion,
        id: proximoId
      };

      this._usuarioService.postUsuario(usuarioConId).subscribe({
        next: (usuarioCreado) => {
          
          usuarioCreado.id = proximoId;
          this.VectorUser.push(usuarioCreado);
          this.usuarioSeleccion = undefined;
          
          if (this.modal) this._util.cerrarModal(this.modal);
          
          Swal.fire({ 
            icon: 'success', 
            title: "Usuario creado correctamente",
            text: `ID asignado: ${proximoId}`
          });
        },
        error: () => {
          Swal.fire({ icon: 'error', title: 'Error al crear usuario' });
        }
      });
    } else {
      
      this._usuarioService.putUsuario(this.usuarioSeleccion.id, this.usuarioSeleccion).subscribe({
        next: () => {
          this.usuarioSeleccion = undefined;
          if (this.modal) this._util.cerrarModal(this.modal);
          Swal.fire({ icon: 'success', title: "Usuario actualizado correctamente" });
        },
        error: () => {
          Swal.fire({ icon: 'error', title: 'Error al actualizar usuario' });
        }
      });
    }
  }

  prepararEliminacion(us: Usuario) {
    this.usuarioAEliminar = us;
  }

  confirmarEliminacion() {
    if (!this.usuarioAEliminar) return;

    this._usuarioService.eliminarUsuario(this.usuarioAEliminar.id).subscribe({
      next: () => {
        
        this.VectorUser = this.VectorUser.filter(u => u.id !== this.usuarioAEliminar!.id);
        
        Swal.fire({ 
          icon: 'success', 
          title: 'Usuario eliminado correctamente',
          timer: 1500,
          showConfirmButton: false
        });
        
        this.usuarioAEliminar = undefined;
      },
      error: () => {
        Swal.fire({ icon: 'error', title: 'Error al eliminar usuario' });
        this.usuarioAEliminar = undefined;
      }
    });
  }
}