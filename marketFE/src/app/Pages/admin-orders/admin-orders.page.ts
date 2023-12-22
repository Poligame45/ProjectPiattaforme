import { SearchOrdersCommand } from 'src/app/models/command/orderCommand/searchOrderCommand';
import { OrdersService } from './../../Services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ListOrderDTO } from 'src/app/models/dto/orders/ListOrderDTO';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Column, Header, Riga, Table } from 'src/app/models/Table';
import { OrderDTO } from 'src/app/models/dto/orders/OrderDTO';
import { OrderUtility } from 'src/app/utils/OrderUtility';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage extends OrderUtility implements OnInit {
  table!: Table;

  constructor(orderService: OrdersService, private router: Router) {
    super(orderService);
  }

  async ngOnInit() {
    // const command: SearchOrdersCommand = new SearchOrdersCommand();
    // this.ret = await firstValueFrom(this.orderService.searchOrders(command));
    this.list = await this.startSearch();
    this.configTable();
    this.configHeader();
  }


  goBack() {
    this.router.navigate(['admin-home-page']);
  }

  editRow(idProd: any) {
    this.router.navigate(['add-update-stored-product'], { queryParams: { product: idProd } });
  }

  configTable() {
    this.table = new Table();
    this.list.forEach((order: OrderDTO) => {
      let row = new Riga();
      let colId = new Column();
      colId.nome = order.id;
      let colData = new Column();
      colData.nome = order.dataAcquisto;
      let colCustomerId = new Column();
      colCustomerId.nome = order.customerId;
      let colTotale = new Column();
      colTotale.nome = order.totale;
      row.columns.push(colId, colData, colCustomerId, colTotale);
      this.table.rows.push(row);
    });
    this.table.hasActionsButton = true;
  }

  configHeader() {
    let headerId = new Header();
    let headerData = new Header();
    let headerCustomerId = new Header();
    let headerTotale = new Header();
    headerId.nome = "Codice ordine";
    headerCustomerId.nome = "Codice cliente";
    headerData.nome = "Data ordine";
    headerTotale.nome = "Totale ordine";
    this.table.headers.push(headerId, headerData, headerCustomerId, headerTotale);

  }

  addStoredItem() {
    this.router.navigate(['add-update-stored-product']);
  }


  async changePage(event: any) {
    await super.goToPage(event);
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
