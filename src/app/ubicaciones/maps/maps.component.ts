import { Component } from '@angular/core';

@Component({
  selector: 'app-maps',
  standalone: false,
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  zoom = 13;
  center: google.maps.LatLngLiteral = { lat: 6.2442, lng: -75.5812 }; 

  
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 20,
    minZoom: 8,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    
    styles: [
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#a0d6d1" }]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{ "color": "#c5e7c5" }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }, { "lightness": 50 }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#b5d9b5" }]
      }
    ]
  };

  
  markerOptions: google.maps.MarkerOptions = {
    animation: google.maps.Animation.DROP,
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  };

  
  parkings = [
    { name: 'Parqueadero San Diego', position: { lat: 6.2295, lng: -75.5696 } },
    { name: 'Parqueadero La Alpujarra', position: { lat: 6.2442, lng: -75.5730 } },
    { name: 'Parqueadero Estadio', position: { lat: 6.2562, lng: -75.5901 } },
    { name: 'Parqueadero El Poblado', position: { lat: 6.2093, lng: -75.5678 } },
  ];

  selectedParking: any = null;

  
  openInfoWindow(parking: any) {
    this.selectedParking = parking;
  }
}