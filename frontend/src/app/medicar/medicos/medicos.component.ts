import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicos } from '../models/main';
import { ConsultasInjectorService } from '../services/consultas-injetor.service';
import { MedicarService } from '../services/medicar.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos: Observable<Medicos[]>;
  selected: Number;
  selectDisable = true;

  constructor(
    private consultasInjectorService: ConsultasInjectorService,
    private medicarService: MedicarService
  ) { }

  ngOnInit(): void {
    this.getMedicos('');
  }

  getMedicos(medicoNome) {
    this.consultasInjectorService.getAllParams().subscribe(
      res => {
        if (res && res.hasOwnProperty('especialidade')) {
          if (!res.hasOwnProperty('medico')) {
            this.medicos = this.medicarService.getMedicos({
              search: medicoNome,
              especialidade: res.especialidade
            });
            this.selectDisable = false;
          }
        } else {
          this.selectDisable = true;
        }
      }
    );
  }

  selectMedico(data) { this.consultasInjectorService.addMedico(data); }

}
