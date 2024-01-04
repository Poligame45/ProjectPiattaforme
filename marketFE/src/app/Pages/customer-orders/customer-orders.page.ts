import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OrdersService } from 'src/app/Services/orders.service';
import { Column, Header, Riga, Table } from 'src/app/models/Table';
import { SearchOrdersCommand } from 'src/app/models/command/orderCommand/searchOrderCommand';
import { OrderDTO } from 'src/app/models/dto/orders/OrderDTO';
import { OrderUtility } from 'src/app/utils/OrderUtility';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.page.html',
  styleUrls: ['./customer-orders.page.scss'],
})
export class CustomerOrdersPage extends OrderUtility implements OnInit {
  table!: Table;

  constructor(orderService:OrdersService, private router:Router) {
    super(orderService);
    this.router.events.subscribe(async (ev) => {
      if (ev instanceof NavigationEnd) {
        this.list = await this.startSearch();
        this.configTable();
        this.configHeader();
      }
    });
  }

  async ngOnInit() {
    let command:SearchOrdersCommand = {
      current: 0,
      take: 10,
      customerId: +sessionStorage.getItem('userId')!!,
      deleted: false,
    }
    
    this.list = await this.startSearch(command);
    this.configTable();
    this.configHeader();

  }
  configTable() {
    this.table = new Table();
    this.table.hasActionsButton = true;
    this.table.hasEditButton = true;
    this.list.forEach((order: OrderDTO) => {
      let row = new Riga();
      let colId = new Column();
      colId.nome = order.id;
      let colData = new Column();
      colData.type = 'date';
      colData.nome = order.dataAcquisto;
      let colTotale = new Column();
      colTotale.nome = order.totale + "€";
      let colNProdotti = new Column();
      colNProdotti.nome = order.purchasedItemList.length;
      row.columns.push(colId, colData, colTotale, colNProdotti);
      this.table.rows.push(row);
    });
  }

  configHeader() {
    let headerId = new Header();
    let headerData = new Header();
    let headerTotale = new Header();
    let headerNProdotti = new Header();
    headerId.nome = "Codice ordine";
    headerData.nome = "Data ordine";
    headerTotale.nome = "Totale ordine";
    headerNProdotti.nome = "Numero prodotti "
    this.table.headers.push(headerId, headerData, headerTotale, headerNProdotti );
  }

  goToDetails(idOrdine:number){
    this.router.navigate(['order-details'], { queryParams: { order: idOrdine } });
  }
  goBack(){
    this.router.navigate(['user-details']);
  }
  goHome(){
    this.router.navigate(['home']);
  }
}
