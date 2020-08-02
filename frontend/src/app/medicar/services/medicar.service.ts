import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Agendas, Consulta, Consultas, Especialidades, Medicos } from '../models/main';

@Injectable({
  providedIn: 'root'
})

export class MedicarService {

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<Consultas[]> {
    return this.http.get<Consultas[]>(`${this.url}api/v1/consultas/`)
      .pipe(
        tap(res => true),
        catchError((err) => {
          console.log(`@ERROR! ${err.message}`);
          return throwError(err);
        })
      );
  }

  getEspecialidades(): Observable<Especialidades[]> {
    return this.http.get<Especialidades[]>(`${this.url}api/v1/especialidades/`);
  }

  getMedicos(payload): Observable<Medicos[]> {
    let params = new HttpParams();
    params = params.append('search', payload.search);
    params = params.append('especialidade', payload.especialidade);

    return this.http.get<Medicos[]>(`${this.url}api/v1/medicos/`,
      { params: params }
    )
      .pipe(
        tap(res => true),
        catchError((err) => {
          console.log(`@ERROR! ${err.message}`);
          return throwError(err);
        })
      );
  }

  getAgendas(payload = null): Observable<Agendas[]> {
    let params = new HttpParams();
    params = params.append('medico', payload.medico);
    params = params.append('especialidade', payload.especialidade);

    return this.http.get<Agendas[]>(
      `${this.url}api/v1/agendas/`,
      { params: params }
    );
  }

  saveConsulta(payload): Observable<Consulta[]> {
    return this.http.post<Consulta[]>(
      `${this.url}api/v1/consultas/`,
      payload
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}api/v1/consultas/${id}`);
  }

  get url(): string {
    return `${environment.urlApi}`;
  }

}
