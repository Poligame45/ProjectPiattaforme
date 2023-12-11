import { Component, OnInit } from '@angular/core';
import { Column, Header, Riga, Table } from 'src/app/models/Table';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  table!: Table;

  actionHeader: Header = {
    nome: "Azioni"
  }

  constructor() { }

  ngOnInit() {
    if (!!this.table.hasActionsButton) {
      this.table.headers.push(this.actionHeader);
    }
  }


  editRow(event: any) {
    console.log(event);
  }

  deleteRow(event: any) {
    console.log(event);

  }
}
