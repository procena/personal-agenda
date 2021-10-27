import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Marcacao } from './marcacao.model';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  base_url = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  getConfig(callback: any) {
    this.http.get<Array<Marcacao>>(`${this.base_url}marcacoes`).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    })

  }

  listarMarcacoes(callback: any) {
    this.http.get<Array<Marcacao>>(`${this.base_url}marcacoes`).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    })
  }

  marcarEvento(novaMarcacao: Marcacao, callback: any) {
    this.http.post<Marcacao>(`${this.base_url}marcacao`, novaMarcacao).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    });
  }

  alterarMarcacao(marcacao: Marcacao, id: number, callback: any) {
    this.http.put<Marcacao>(`${this.base_url}marcacao/${id}`, marcacao).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    });
  }

  removerMarcacao(id: number, callback: any) {
    this.http.delete<Marcacao>(`${this.base_url}marcacao/${id}`).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    });
  }

  listarMarcacoesByMonth(monthNumber: number, callback: any) {
    this.http.get(`${this.base_url}marcacao-mes/${monthNumber}`).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    })
  }

  listarMarcacoesByData(data: string, callback: any) {
    this.http.get(`${this.base_url}marcacao/${data}`).subscribe(data => {
      callback(data)
    }, (error) => {
      console.log(error.message);
    });
  }
}
