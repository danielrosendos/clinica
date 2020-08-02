import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Consultas } from '../models/main';
import { MedicarService } from '../services/medicar.service';
import { ServicesService } from '../../core/services.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  consultas$: Observable<Consultas[]>;
  displayedColumns: string[] = ['especialidade', 'medico', 'dia', 'horario', 'action'];

  constructor(
    private mainService: MedicarService,
    private coreService: ServicesService
  ) { }

  ngOnInit(): void {
    this.getConsultas();
  }

  getConsultas() {
    this.consultas$ = this.mainService.getConsultas();
  }

  delete(row) {
    this.mainService.delete(row.id).subscribe(
      res => { this.coreService.openToast('Sua consulta foi desmarcada!'); window.location.reload(); },
      err => { this.coreService.openToast(err.message, true); }
    );
  }

}
