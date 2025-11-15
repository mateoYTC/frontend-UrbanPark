import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprobanteComponent } from './Comprobante/comprobante.component'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },
  { 
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
  },
  { 
    path: 'ubicaciones',
    loadChildren: () => import('./ubicaciones/ubicaciones.module').then(m => m.UbicacionesModule)
  },
  { 
    path: 'empresa',
    loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule)
  },
  { 
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule)
  },
  
  { 
    path: 'comprobante', 
    component: ComprobanteComponent 
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }