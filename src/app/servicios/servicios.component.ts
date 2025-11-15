import { Component, OnInit } from '@angular/core';

interface Servicio {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  icono: string;
}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  
  servicios: Servicio[] = [
    {
      titulo: 'TAG',
      subtitulo: 'FLYPASS',
      descripcion: 'Paga el parqueo con tu cuenta de FlyPass. Si aún no la tienes, solicítala en nuestro punto de atención.',
      icono: 'fa-solid fa-credit-card'
    },
    {
      titulo: 'LAVADO',
      subtitulo: 'ESPECIALIZADO',
      descripcion: 'Usamos productos ecológicos especializados para el cuidado y mantenimiento de tu vehículo.',
      icono: 'fa-solid fa-spray-can-sparkles'
    },
    {
      titulo: 'VALET',
      subtitulo: 'PARKING',
      descripcion: 'Recogemos tu vehículo en el aeropuerto, y a tu llegada, te lo regresamos hasta el aeropuerto.',
      icono: 'fa-solid fa-car'
    },
    {
      titulo: 'CAMBIO',
      subtitulo: 'DE EXTINTOR',
      descripcion: 'Si tu extintor se encuentra vencido, o está cerca la fecha de hacerlo, nosotros lo renovamos.',
      icono: 'fa-solid fa-fire-extinguisher'
    }
  ];

  currentIndex = 0;
  itemsPerView = 3;

  constructor() { }

  ngOnInit(): void {
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next(): void {
    if (this.currentIndex < this.servicios.length - this.itemsPerView) {
      this.currentIndex++;
    }
  }

  canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  canGoNext(): boolean {
    return this.currentIndex < this.servicios.length - this.itemsPerView;
  }

  getVisibleServicios(): Servicio[] {
    return this.servicios.slice(this.currentIndex, this.currentIndex + this.itemsPerView);
  }
}