import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../agenda.service';
import { Acesso } from '../model/Acesso';
import { Submodulo } from '../model/Submodulo';
import { Utilizador } from '../model/Utilizador';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../app.component.css']
})
export class MenuComponent implements OnInit {
  showFiller = false;
  listaMenu: Array<Acesso> = [];
  user!: Utilizador;

  constructor(private agenda: AgendaService) { }

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString !== null) {
      this.user = JSON.parse(userInfoString);
    }
    this.getMenuList();


  }

  getMenuList() {
    this.agenda.getAcessos(this.user.profile, (acessos: Array<Acesso>) => {
      console.log(acessos);
      this.listaMenu = acessos;

    })

  }

  

}
