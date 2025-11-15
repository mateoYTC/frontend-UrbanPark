import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaComponent } from '../reserva/reserva.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReservaComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }