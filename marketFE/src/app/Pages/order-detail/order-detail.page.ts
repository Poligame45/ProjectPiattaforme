import { GetDeleteOrderCommand } from './../../models/command/orderCommand/GetDeleteOrderCommand';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrdersService } from 'src/app/Services/orders.service';
import { OrderDTO } from 'src/app/models/dto/orders/OrderDTO';
import { firstValueFrom } from 'rxjs';
import { Column, Header, Riga, Table } from 'src/app/models/Table';
import { PurchasedItemDTO } from 'src/app/models/dto/purchasedItemDTO/purchasedItemDTO';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  table!: Table;
  order!: OrderDTO;
  list!: Array<PurchasedItemDTO>;

  ngOnInit(): void {

  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private orderService: OrdersService) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.searchProduct();
      }
    });
  }

  async searchProduct() {
    this.list = new Array<PurchasedItemDTO>();
    let codiceOrdine = await this.activatedRoute.snapshot.queryParamMap.get('order');
    const command: GetDeleteOrderCommand = {
      codice: +codiceOrdine!!,
    }
    this.order = await firstValueFrom(this.orderService.getOrder(command));
    this.list = this.order.purchasedItemList;
    this.configTable();
    this.configHeader();
  }

  configTable() {
    this.table = new Table();
    this.list.forEach((purchase: PurchasedItemDTO) => {
      let row = new Riga();
      let colCodiceProdotto = new Column();
      colCodiceProdotto.nome = purchase.storedProduct.codice;
      let colNomeProdotto = new Column();
      colNomeProdotto.nome = purchase.storedProduct.nome;
      let colQtaAcquistata = new Column();
      colQtaAcquistata.nome = purchase.qtaAcquistata;
      let colPrezzoU = new Column();
      colPrezzoU.nome = purchase.storedProduct.prezzo+"€";

      row.columns.push(colCodiceProdotto, colNomeProdotto, colPrezzoU, colQtaAcquistata);
      this.table.rows.push(row);
    });
  }

  configHeader() {
    let headerCodiceProdotto = new Header();
    let headerNomeProdotto = new Header();
    let headerPrezzoU = new Header();
    let headerQtaAcquistata = new Header();
    headerCodiceProdotto.nome = "Codice Prodotto";
    headerNomeProdotto.nome = "Prodotto acquistato";
    headerPrezzoU.nome = "Prezzo unitario";
    headerQtaAcquistata.nome = "Quantità acquistata";
    this.table.headers.push(headerCodiceProdotto, headerNomeProdotto, headerPrezzoU,headerQtaAcquistata);
  }
}
