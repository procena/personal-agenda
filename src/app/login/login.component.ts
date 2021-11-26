import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { AgendaService } from '../agenda.service';
import { Utilizador } from "../model/Utilizador";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  utilizador = new Utilizador

  constructor(private agenda: AgendaService, public router: Router) { }

  ngOnInit(): void {
  }
  login(): void {
    //console.log(this.utilizador);
    this.agenda.autencicaruser(this.utilizador.username, this.utilizador.password, (dataUser: Utilizador) => {
      localStorage.setItem('userInfo', JSON.stringify(dataUser));
      localStorage.setItem('token', dataUser.token.toString());
      this.router.navigate(['menu']);
    });
  }
}
