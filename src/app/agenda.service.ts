import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Marcacao } from './marcacao.model';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  getConfig(callback:any) {
    this.http.get<Array<Marcacao>>('http://localhost:8080/marcacoes').subscribe(data => {
      callback(data);
    })
  }
}
