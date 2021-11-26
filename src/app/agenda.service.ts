import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Marcacao } from './marcacao.model';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  base_url = 'http://localhost:4200/api/';

  constructor(private http: HttpClient) { }

  getHeader(): any {
    var token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders()
        .set('Authorization', `${token}`)
    }
  }

  getConfig(callback: any) {

    this.http.get<Array<Marcacao>>(`${this.base_url}marcacoes`, this.getHeader()).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    })

  }

  listarMarcacoes(callback: any) {
    this.http.get<Array<Marcacao>>(`${this.base_url}marcacoes`, this.getHeader()).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    })
  }

  marcarEvento(novaMarcacao: Marcacao, callback: any) {
    this.http.post<Marcacao>(`${this.base_url}marcacao`, novaMarcacao, this.getHeader()).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    });
  }

  alterarMarcacao(marcacao: Marcacao, id: number, callback: any) {
    this.http.put<Marcacao>(`${this.base_url}marcacao/${id}`, marcacao, this.getHeader()).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    });
  }

  removerMarcacao(id: number, callback: any) {
    this.http.delete<Marcacao>(`${this.base_url}marcacao/${id}`, this.getHeader()).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    });
  }

  listarMarcacoesByMonth(monthNumber: number, callback: any) {
    console.log(monthNumber);
    this.http.get(`${this.base_url}marcacao-mes/${monthNumber}`, this.getHeader()).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error.message);
    })
  }

  listarMarcacoesByData(data: string, callback: any) {
    this.http.get(`${this.base_url}marcacao/${data}`, this.getHeader()).subscribe(data => {
      callback(data)
    }, (error) => {
      console.log(error.message);
    });
  }

  autencicaruser(username: string, password: string, callback: any) {
    // this.router.navigate(['login']);

    this.http.post(`${this.base_url}utilizador/login?username=${username}&password=${password}`, { username, password }).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error);
    })
  }

  getAcessos(username: String, callback: any) {
    this.http.get(`${this.base_url}acessos/admin`, this.getHeader()).subscribe(data => {
      callback(data);
    }, (error) => {
      console.log(error);
    })
  }

  getAllSubmodulos(modulo: String, callback: any) {
    this.http.get(`${this.base_url}submodulos/listar-submodulos/${modulo}`, this.getHeader()).subscribe(data => {
      callback(data);
    }, (error)=>{
      console.log(error);
    })
  }
}
