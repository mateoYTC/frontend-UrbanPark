import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { RouterModule, Routes } from '@angular/router';
import { CuUsuarioComponent } from './cu-usuario/cu-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReUsuarioComponent } from './re-usuario/re-usuario.component';
import { RsUsuarioComponent } from './rs-usuario/rs-usuario.component';
import { DelUsuarioComponent } from './del-usuario/del-usuario.component';

const ROUTES: Routes = [
  {
    path:'',
    component:ListarComponent
  }

]

@NgModule({
  declarations: [
    ListarComponent,
    CuUsuarioComponent,
    ReUsuarioComponent,
    RsUsuarioComponent,
    DelUsuarioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule
    
  ]
})

export class UsuarioModule { }
