import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { format } from 'date-fns-tz';
@Component({
  selector: 'app-rs-usuario',
  standalone: false,
  templateUrl: './rs-usuario.component.html',
  styleUrl: './rs-usuario.component.css'
})
export class RsUsuarioComponent {
  @Input()usuario: Usuario | undefined;
  formatDateTimeLocal(fecha:Date){
    let fechaFormato = format(fecha,"yyyy-MM-dd'T'HH:mm",{timeZone:"America/Bogota"});
        return fechaFormato;
  }

  updateDate(valor:Date){
    this.usuario!.Registro_Salida = new Date(valor);
  }


}
