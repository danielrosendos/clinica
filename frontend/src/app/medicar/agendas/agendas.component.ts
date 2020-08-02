import { Component, OnInit } from '@angular/core';

import { ConsultasInjectorService } from '../services/consultas-injetor.service';
import { MedicarService } from '../services/medicar.service';
import { ServicesService } from '../../core/services.service';


@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {

  agendasOptions = [];
  hoursListOptions = [];
  selectDayDisable = true;
  selectHourDisable = true;
  agendaSelected: number;
  hourSelected: string;
  chosenDate: number;


  constructor(
    private medicarService: MedicarService,
    private consultasInjectorService: ConsultasInjectorService,
    private coreService: ServicesService
  ) { }

  ngOnInit(): void {
    this.getAvaibleAgendas();
  }

  getAvaibleAgendas() {
    this.consultasInjectorService.getAllParams().subscribe(
      res => {
        if (res && res.hasOwnProperty('medico')) {
          const response = this.medicarService.getAgendas(res);
          response.subscribe(
            res => {
              if (res.length === 0) {
                this.coreService.openToast('Nenhuma Agenda disponível! Tente outro medico ou aguarde atualização', true);
              } else {
                this.selectDayDisable = false;
                this.agendasOptions = res;
              }
            },
            err => { this.coreService.openToast('Ops! Tivemos um problema interno! tente novamente mais tarde.', true); }
          );
        }
      }
    );
  }

  selectDay(day) {
    if (day.hasOwnProperty('horarios')) {
      if (day.horarios.length > 0) {
        this.chosenDate = day.id;
        this.hoursListOptions = day.horarios;
        this.selectHourDisable = false;
      } else {
        this.coreService.openToast('Não encontramos nenhum horário disponível para essa data', true);
      }
    }
  }

  selectHour(horario) {
    const payload = {
      id_agenda: this.chosenDate,
      horario: horario
    };
    this.consultasInjectorService.readyToFinish(payload);
  }

}
