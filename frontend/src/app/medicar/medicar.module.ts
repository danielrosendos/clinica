import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicarRoutingModule } from './medicar-routing.module';
import { ConsultasComponent } from './consultas/consultas.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { MaterialModule } from '../material.module';
import { MarcarComponent } from './marcar/marcar.component';
import { MatTableModule } from '@angular/material/table';
import { MedicosComponent } from './medicos/medicos.component';
import { AgendasComponent } from './agendas/agendas.component';


@NgModule({
  declarations: [ConsultasComponent, EspecialidadesComponent, MarcarComponent, MedicosComponent, AgendasComponent],
  imports: [
    CommonModule,
    MedicarRoutingModule,
    MaterialModule,
    MatTableModule
  ]
})
export class MedicarModule { }
