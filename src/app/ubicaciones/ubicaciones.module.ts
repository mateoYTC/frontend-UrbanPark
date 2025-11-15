import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    component: MapsComponent
  }
];
@NgModule({
  declarations: [
    MapsComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class UbicacionesModule { }
