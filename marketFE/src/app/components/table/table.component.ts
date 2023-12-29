import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Header, Riga, Table } from 'src/app/models/Table';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() table!: Table;
  @Output() editRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteRowEvent: EventEmitter<any> = new EventEmitter();

  actionHeader: Header = {
    nome: "Azioni"
  }

  constructor() { }
  

  ngOnInit() {
  }



  editRow(event: Riga) {
    const id = event.columns[0].nome;
    this.editRowEvent.emit(id);
  }

  deleteRow(event: any) {
    const id = event.columns[0].nome;
    this.deleteRowEvent.emit(id);
  }
}
