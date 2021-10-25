import { Component, ChangeDetectorRef, ViewChild  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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

  constructor(private agenda: AgendaService, private changeDetectorRefs: ChangeDetectorRef) { }
  nome: string = "João Sebastião";
  monthFilters: Array<String> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  selectedMounth = this.monthFilters[this.actualDate.getMonth()];


  displayedColumns: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  marcacoes!: Array<Marcacao>;
  dataSource: any = undefined;
  //dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    console.log(this.selectedMounth);
    var filterDate = this.getStart_EndDateOfMonth();
    this.dataStart = filterDate[0];
    this.dataEnd = filterDate[1];
    this.dataSource = this.generateCalendar();
    this.agenda.getConfig((data: Array<Marcacao>) => {
      console.log(data[0].data);
      this.marcacoes = data;
    });

  }

  selectMonth() {
    var filterDate = this.getStart_EndDateOfMonth();
    this.dataStart = filterDate[0];
    this.dataEnd = filterDate[1];
    this.dataSource = this.generateCalendar();
    this.table.renderRows();
  }

  getStart_EndDateOfMonth(): Array<string> {
    var now = new Date();
    var startDate = new Date(now.getFullYear(), this.monthFilters.indexOf(this.selectedMounth) + 1, 1);
    var endDate = new Date(now.getFullYear(), this.monthFilters.indexOf(this.selectedMounth) + 2, 0);
    console.log(startDate);
    console.log(startDate.toISOString().slice(0,10));

    return [`${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`, `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`];
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
      console.log(`${startDt} <=> ${endDt}`);

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

    console.log(calendar);
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
}
