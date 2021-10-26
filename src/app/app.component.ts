  import { Component, ViewChild, Inject } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AgendaService } from './agenda.service';
import { Marcacao } from './marcacao.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personal-agenda';
  @ViewChild(MatTable)
  table!: MatTable<any>;
  actualDate = new Date();
  panelOpenState = false;
  data!: Date;
  selectedValue: string | undefined;
  selectedCar: string | undefined;
  dataStart: string | undefined;
  dataEnd: string | undefined;

  constructor(private agenda: AgendaService, public dialog: MatDialog) { }
  nome: string = "João Sebastião";
  monthFilters: Array<String> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  selectedMounth = this.monthFilters[this.actualDate.getMonth()];


  displayedColumns: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  marcacoes!: Array<Marcacao>;
  dataSource: any = undefined;
  //dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {

    /*var filterDate = this.getStart_EndDateOfMonth();
    console.log(filterDate);*/
    this.dataStart = this.getStart_EndDateOfMonth()[0];
    this.dataEnd = this.getStart_EndDateOfMonth()[1];
    this.dataSource = this.generateCalendar();
    this.agenda.getConfig((data: Array<Marcacao>) => {
      this.marcacoes = data;
    });

  }

  selectMonth() {
    var filterDate = this.getStart_EndDateOfMonth();
    this.dataStart = filterDate[0];
    this.dataEnd = filterDate[1];
    console.log([this.dataStart, this.dataEnd]);
    this.dataSource = this.generateCalendar();
    this.table.renderRows();
  }

  getStart_EndDateOfMonth(): Array<string> {
    var now = new Date();
    var startDate = new Date(now.getFullYear(), this.monthFilters.indexOf(this.selectedMounth));
    var endDate = new Date(now.getFullYear(), this.monthFilters.indexOf(this.selectedMounth)+1, 0);
    console.log([`${startDate.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth)+1}-${startDate.getDate()}`,`${endDate.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth)+1}-${endDate.getDate()}`]);
    console.log(startDate);
    console.log(endDate);
    return [`${startDate.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth)+1}-${startDate.getDate()}`,`${endDate.getFullYear()}-${this.monthFilters.indexOf(this.selectedMounth)+1}-${endDate.getDate()}`];
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

  openDialog() {
    this.dialog.open(DialogContentAddMarcacao, {
      data: {
        evento: null,
        data: null,
        hora: null,
        estado: null
      },
      height: '400px',
      width: '350px'
    });
  }
}


@Component({
  selector: 'dialog-content-add-marcacao',
  templateUrl: 'dialog-content-add-marcacao.html',
})
export class DialogContentAddMarcacao {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Marcacao) {}
}
