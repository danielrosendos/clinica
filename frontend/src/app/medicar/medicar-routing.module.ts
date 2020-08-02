import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { GuardService } from '../auth/services/guard.service';
import { MarcarComponent } from './marcar/marcar.component';


const routes: Routes = [
  { path: 'consultas', component: ConsultasComponent, canActivate: [GuardService] },
  { path: 'marcar-consultas', component: MarcarComponent, canActivate: [GuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicarRoutingModule { }
