import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Especialidades } from '../models/main';
import { MedicarService } from '../services/medicar.service';
import { ConsultasInjectorService } from '../services/consultas-injetor.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})

export class EspecialidadesComponent implements OnInit {

  especialidades: Observable<Especialidades[]>;
  selected: number;

  constructor(
    private medicarService: MedicarService,
    private consultasInjectorService: ConsultasInjectorService
  ) { }

  ngOnInit() {
    this.getEspecialidades();
  }

  async getEspecialidades() {
    this.especialidades = await this.medicarService.getEspecialidades();
  }

  selectEspecialidade(data) {
    this.especialidades.subscribe(res => { this.consultasInjectorService.addEspecialidade(data); });
  }

}
