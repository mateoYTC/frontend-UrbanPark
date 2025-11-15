import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
@Component({
  selector: 'app-del-usuario',
  standalone: false,
  templateUrl: './del-usuario.component.html',
  styleUrl: './del-usuario.component.css'
})
export class DelUsuarioComponent {
  @Input()usuario: Usuario | undefined;

}
