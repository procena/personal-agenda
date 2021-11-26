import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AgendaService } from '../agenda.service';
import { Marcacao } from '../marcacao.model';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css','../app.component.css']
})
export class CalendarioComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>;
  actualDate = new Date();
  panelOpenState = false;
  showContentEvent = false;

  selectedValue: string | undefined;
  selectedCar: string | undefined;
  dataStart: string | undefined;
  dataEnd: string | undefined;
  hours: Array<string> = this.generateHoursOptions();
  novaMarcacao = new Marcacao();

  displayedColumns: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  marcacoes!: Array<Marcacao>;
  dataSource: any = undefined;
  monthFilters: Array<String> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  selectedMounth = this.monthFilters[this.actualDate.getMonth()];
  constructor(private agenda: AgendaService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.dataStart = this.getStart_EndDateOfMonth()[0];
    this.dataEnd = this.getStart_EndDateOfMonth()[1];
    this.dataSource = this.generateCalendar();
    this.atualizarMarcacoes();
    this.hours = this.generateHoursOptions();
  }

  obterEvento(data: string) {
    if (data !== '-') {
      var now = new Date();
      var stringData = `${now.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth) + 1}-${parseInt(data) <= 9 ? "0" : ""}${data}`;
      this.showEventFromData(stringData);
    }

  }

  atualizarMarcacoes() {
    this.agenda.listarMarcacoesByMonth(this.monthFilters.indexOf(this.selectedMounth) + 1, (data: Array<Marcacao>) => {
      this.marcacoes = data;
    })
  }

  countNumberEvents(data: string): Number {
    if (data !== '-') {
      var now = new Date();
      var countEvent = 0;
      var stringData = `${now.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth) + 1}-${parseInt(data) <= 9 ? "0" : ""}${data}`;
      /*this.marcacoes.forEach((item) => {
        if (stringData === item.data) {
          countEvent++;
        }
      });*/
      if (this.marcacoes !== undefined) {
        for (var index = 0; index < this.marcacoes.length; index++) {
          var item = this.marcacoes[index];
          if (stringData === item.data) {
            countEvent++;
          }
        }
      }


      return countEvent;
    }

    return 0;

  }

  selectMonth() {
    var filterDate = this.getStart_EndDateOfMonth();
    this.dataStart = filterDate[0];
    this.dataEnd = filterDate[1];
    console.log([this.dataStart, this.dataEnd]);
    this.dataSource = this.generateCalendar();
    this.table.renderRows();
    this.atualizarMarcacoes();
  }

  getStart_EndDateOfMonth(): Array<string> {
    var now = new Date();
    var startDate = new Date(now.getFullYear(), this.monthFilters.indexOf(this.selectedMounth));
    var endDate = new Date(now.getFullYear(), this.monthFilters.indexOf(this.selectedMounth) + 1, 0);
    console.log([`${startDate.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth) + 1}-${startDate.getDate()}`, `${endDate.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth) + 1}-${endDate.getDate()}`]);
    console.log(startDate);
    console.log(endDate);
    return [`${startDate.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth) + 1}-${startDate.getDate()}`, `${endDate.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth) + 1}-${endDate.getDate()}`];
  }

  isDate(dateArg: any): boolean {
    var t = (dateArg instanceof Date) ? dateArg : (new Date(dateArg));
    return !isNaN(t.valueOf());
  }

  isValidRange(minDate: any, maxDate: any): boolean {
    return (new Date(minDate) <= new Date(maxDate));
  }

  generateListDate(startDt: any, endDt: any): Array<any> {

    var error = ((this.isDate(endDt)) && (this.isDate(startDt)) && (this.isValidRange(startDt, endDt))) ? false : true;
    var between: Array<Array<any>> = [];
    if (error) console.log(`error occured!!!... Please Enter Valid Dates ${startDt} <=> ${endDt}`);
    else {

      var currentDate = new Date(startDt),
        end = new Date(endDt);
      var week = 0;

      var listWeek: Array<any> = [];
      while (currentDate <= end) {

        var newDate = new Date(currentDate);

        if (listWeek.indexOf(week) === -1) {
          listWeek.push(week);
          between[week] = new Array;
        }

        //between[week].push(newDate);
        between[week].push(newDate);
        if (newDate.getDay() == 6) {
          week++;
        }
        //between.push({position: newDate.getDay(), date: newDate.getDate()});
        currentDate.setDate(currentDate.getDate() + 1);

      }
    }
    return between;
  }

  generateHoursOptions(): Array<string> {
    var start = 7;
    var end = 19;
    var listHours: Array<string> = new Array();
    for (let hour = start; end >= hour; hour++) {
      if (hour < 10) {
        listHours.push(`0${hour}:00`);
      }
      else {
        listHours.push(`${hour}:00`);
      }
    }
    return listHours;
  }

  addMarcacao() {
    console.log(this.novaMarcacao);
    this.novaMarcacao.estado = 'novo';
    this.agenda.marcarEvento(this.novaMarcacao, (data: Marcacao) => {
      console.log(data);
      window.location.reload();
    })
    var resetForm = <HTMLFormElement>document.getElementById('addEvento');
    resetForm.reset();
  }

  generateCalendar(): Array<Object> {
    var listDates = this.generateListDate(this.dataStart, this.dataEnd);

    var calendar: Array<Object> = [];

    listDates.forEach((element) => {
      var obj = {
        Dom: this.getDateOnWeekday('Dom', element),
        Seg: this.getDateOnWeekday('Seg', element),
        Ter: this.getDateOnWeekday('Ter', element),
        Qua: this.getDateOnWeekday('Qua', element),
        Qui: this.getDateOnWeekday('Qui', element),
        Sex: this.getDateOnWeekday('Sex', element),
        Sab: this.getDateOnWeekday('Sab', element),
      };
      calendar.push(obj);
    })

    return calendar;
  }

  getDateOnWeekday(day: string, arrayDate: Array<Date>): any {
    for (let index = 0; index < arrayDate.length; index++) {
      const element = arrayDate[index];
      if (this.displayedColumns[element.getDay()] === day) {
        return arrayDate[index].getDate()
      }
    }

    return '-';
  }

  openDialog(marcacao: Marcacao) {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        evento: marcacao.evento,
        data: marcacao.data,
        hora: marcacao.hora,
        estado: marcacao.estado
      }
    });
  }
  getMarcacaoFromList(data: string): any {

    for (let index = 0; index < this.marcacoes.length; index++) {
      const element = this.marcacoes[index];
      if (element.data == data) {

        return element;
      }

    }
    return null;
  }

  showEventFromData(data: string) {

    this.showContentEvent = true;
    this.panelOpenState = true;
    var marcacao = this.getMarcacaoFromList(data);
    if (marcacao !== null) {
      this.openDialog(marcacao);
    }
  }
  removerMarcacao(id: number) {
    this.agenda.removerMarcacao(id, (data: Marcacao) => {
      console.log(data);
      this.atualizarMarcacoes();
    });

  }

  editarMarcacao(marcacao: Marcacao) {
    this.novaMarcacao = marcacao;
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: '../dialog-content-add-marcacao.html',
  styleUrls: ['../app.component.css']
})
export class DialogDataExampleDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Marcacao, public dialogRef: MatDialogRef<DialogDataExampleDialog>,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}