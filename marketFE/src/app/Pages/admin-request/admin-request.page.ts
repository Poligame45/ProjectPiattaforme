import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/Services/request.service';
import { RequestUtility } from 'src/app/utils/requestUtility';
import { SearchRequestCommand } from 'src/app/models/command/requestCommand/searchRequestCommand';
import { NavigationEnd, Router } from '@angular/router';
import { Column, Header, Riga, Table } from 'src/app/models/Table';
import { RequestDTO } from 'src/app/models/dto/request/requestDTO';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.page.html',
  styleUrls: ['./admin-request.page.scss'],
})
export class AdminRequestPage extends RequestUtility implements OnInit {
  filtri: SearchRequestCommand = new SearchRequestCommand();
  table!: Table;

  constructor(serviceRequest: RequestService, private router: Router) {
    super(serviceRequest);
    this.router.events.subscribe(async (ev) => {
      if (ev instanceof NavigationEnd) {
        this.list = await super.startSearch();
      }
    });
  }

  async ngOnInit() {
    this.list = await super.startSearch(this.filtri);
    console.log(this.list);
    this.configTable();
    this.configHeader();
  }


  configTable() {
    this.table = new Table();
    this.table.hasEditButton = true;
    this.table.hasActionsButton = true;
    this.list.forEach((request: RequestDTO) => {
      let row = new Riga();
      let colId = new Column();
      colId.nome = request.id;
      let colCustomerId = new Column();
      colCustomerId.nome = request.customer.id;
      let colContent = new Column();
      colContent.nome = request.content;
      row.columns.push(colId, colCustomerId, colContent);
      this.table.rows.push(row);
    });
  }

  configHeader() {
    let headerId = new Header();
    let headerCustomerId = new Header();
    let headerContent = new Header();
    headerId.nome = "Codice Richiesta";
    headerCustomerId.nome = "Codice cliente";
    headerContent.nome = "Contenuto richiesta";
    this.table.headers.push(headerId, headerCustomerId, headerContent);
  }

  goToRequestDetail(idReq: any) {
    this.router.navigate(['request-details'], { queryParams: { request: idReq } });
  }

  goBack() {
    this.router.navigate(['admin-home-page']);
  }
  goToHome() {
    this.router.navigate(['admin-home-page']);
  }

  async changePage(event: any) {
    await super.goToPage(event, this.totRequest);
    this.list = await super.startSearch();
    this.configTable();
    this.configHeader();
  }

  async changeSize(event: any) {
    await super.changePageSize(event);
    this.configTable();
    this.configHeader();
  }
}
