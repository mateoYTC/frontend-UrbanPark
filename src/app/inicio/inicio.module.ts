import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    // VACÍO - no declarar componentes standalone aquí
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HomeComponent  // ← Componente standalone va en imports
  ]
})
export class InicioModule { }