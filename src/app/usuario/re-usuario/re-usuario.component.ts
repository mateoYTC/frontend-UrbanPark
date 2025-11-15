import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import {format} from 'date-fns-tz';
@Component({
  selector: 'app-re-usuario',
  standalone: false,
  templateUrl: './re-usuario.component.html',
  styleUrl: './re-usuario.component.css'
})
export class ReUsuarioComponent {
  @Input()usuario: Usuario | undefined;

  formatDateTimeLocal(fecha:Date){
    let fechaFormato = format(fecha,"yyyy-MM-dd'T'HH:mm",{timeZone:"America/Bogota"});
    return fechaFormato;

  }
   updateDate(valor:Date){
    this.usuario!.Registro_Entrada = new Date(valor);
  }

}
