import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from './../../Services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Column, Header, Riga, Table } from 'src/app/models/Table';
import { OrderDTO } from 'src/app/models/dto/orders/OrderDTO';
import { OrderUtility } from 'src/app/utils/OrderUtility';
import { SearchOrdersCommand } from 'src/app/models/command/orderCommand/searchOrderCommand';
import { GetDeleteOrderCommand } from 'src/app/models/command/orderCommand/GetDeleteOrderCommand';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage extends OrderUtility implements OnInit {
  table!: Table;
  myForm!: FormGroup;
  dataAcquistoDaSelected: boolean = false;
  filtri: SearchOrdersCommand = new SearchOrdersCommand();
  today: String = new Date().toISOString();


  constructor(orderService: OrdersService, private router: Router) {
    super(orderService);
  }

  async ngOnInit() {
    this.configForm();
    this.list = await this.startSearch();
    this.configTable();
    this.configHeader();
  }
  selezionaDataDa() {
    this.dataAcquistoDaSelected = true;
    this.filtri.dataAcquistoDa = this.changeFormatDate(this.myForm.value.dataAcquistoDa);

  }
  changeFormatDate(date: String) {
    let data = date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
    return data;
  }

  resetData() {
    this.dataAcquistoDaSelected = false;
  }

  configForm() {
    this.myForm = new FormGroup({
      totale: new FormControl(),
      dataAcquistoDa: new FormControl(),
      dataAcquistoA: new FormControl(),
      deleted: new FormControl()
    });
  }

  async onSubmit() {
    this.filtri.deleted = this.myForm.value.deleted;
    this.filtri.totale = this.myForm.value.totale;
    this.filtri.dataAcquistoA = !!this.myForm.value.dataAcquistoA ? this.changeFormatDate(this.myForm.value.dataAcquistoA) : this.changeFormatDate(this.today);
    this.list = await super.startSearch(this.filtri);
    this.configTable();
    this.configHeader();
  }

  async rimuoviFiltri() {
    this.filtri.totale = undefined;
    this.filtri.dataAcquistoA = undefined;
    this.filtri.dataAcquistoDa = undefined;
    this.dataAcquistoDaSelected = false;
    this.myForm.reset();
    this.list = await super.startSearch(new SearchOrdersCommand());
    this.configTable();
    this.configHeader();
  }

  goBack() {
    this.router.navigate(['admin-home-page']);
  }

  editRow(idOrder: any) {
    this.router.navigate(['order-details'], { queryParams: { order: idOrder } });
  }
  async deleteRow(idOrder: any) {
    const command: GetDeleteOrderCommand = {
      codice: +idOrder,
    }
    let order = await firstValueFrom(this.orderService.getOrder(command));
    if (!!order.deleted) {
      alert("Ordine già annullato");
      return;
    } else {
      firstValueFrom(await this.orderService.deleteOrder(command));
      alert("Ordine annullato");
    }
  }

  configTable() {
    this.table = new Table();
    this.table.hasDeleteButton = true;
    this.table.hasEditButton = true;
    this.table.hasActionsButton = true;
    this.list.forEach((order: OrderDTO) => {
      let row = new Riga();
      let colId = new Column();
      colId.nome = order.id;
      let colDeleted = new Column();
      colDeleted.nome = order.deleted;
      let colData = new Column();
      colData.nome = order.dataAcquisto;
      colData.type = "date";
      let colCustomerId = new Column();
      colCustomerId.nome = order.customerId;
      let colTotale = new Column();
      colTotale.nome = order.totale + "€";
      row.columns.push(colId, colData, colCustomerId, colTotale, colDeleted);
      this.table.rows.push(row);
    });
  }

  configHeader() {
    let headerId = new Header();
    let headerData = new Header();
    let headerCustomerId = new Header();
    let headerTotale = new Header();
    let headerDeleted = new Header();
    headerDeleted.nome = "Deleted";
    headerId.nome = "Codice ordine";
    headerCustomerId.nome = "Codice cliente";
    headerData.nome = "Data ordine";
    headerTotale.nome = "Totale ordine";
    this.table.headers.push(headerId, headerData, headerCustomerId, headerTotale, headerDeleted);

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
