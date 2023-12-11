import { Component, Input, OnInit } from '@angular/core';
import { Column, Header, Riga, Table } from 'src/app/models/Table';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() _table!: Table;

  public set table(table: Table) {
    this._table = table;
  }
  actionHeader: Header = {
    nome: "Azioni"
  }

  constructor() { }

  ngOnInit() {
    if (!!this._table.hasActionsButton) {
      this._table.headers.push(this.actionHeader);
    }
  }


  editRow(event: any) {
    console.log(event);
  }

  deleteRow(event: any) {
    console.log(event);

  }
}
