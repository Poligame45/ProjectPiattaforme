import { Component, Input, OnInit } from '@angular/core';
import { Header, Table } from 'src/app/models/Table';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() table!: Table;


  actionHeader: Header = {
    nome: "Azioni"
  }

  constructor() { }


  ngOnInit() {

  }


  editRow(event: any) {
    console.log(event);
  }

  deleteRow(event: any) {
    console.log(event);

  }
}
