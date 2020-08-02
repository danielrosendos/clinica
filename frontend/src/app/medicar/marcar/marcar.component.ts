import { Component, OnInit } from '@angular/core';

import { ConsultasInjectorService } from '../services/consultas-injetor.service';
import { MedicarService } from '../services/medicar.service';
import { ServicesService } from '../../core/services.service';


@Component({
  selector: 'app-marcar',
  templateUrl: './marcar.component.html',
  styleUrls: ['./marcar.component.css']
})
export class MarcarComponent implements OnInit {

  confirmBtnDisable = true;
  payload: object;

  constructor(
    private consultasInjectorService: ConsultasInjectorService,
    private medicaService: MedicarService,
    private coreService: ServicesService
  ) { }

  ngOnInit() {
    this.consultasInjectorService.getAllParams().subscribe(
      res => {
        if (res && res.hasOwnProperty('id_agenda') && res.hasOwnProperty('horario')) {
          this.confirmBtnDisable = false;
          this.payload = res;
        }
      }
    );
  }

  saveDate() {
    this.medicaService.saveConsulta(this.payload).subscribe(
      res => {
        this.coreService.openToast('Consulta marcada com sucesso!');
        this.backToHome();
      },
      err => {
        if (err.hasOwnProperty('error')) { this.coreService.openToast(JSON.stringify(err.error)); }
      }
    );
  }

  cancelActions() {
    this.consultasInjectorService.cleanBehaviors();
    this.backToHome();
  }

  backToHome() { this.coreService.changeRouter('/consultas'); }

}
