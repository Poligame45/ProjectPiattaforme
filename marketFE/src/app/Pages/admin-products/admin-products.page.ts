import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { StoredProduct } from 'src/app/models/StoredProduct';
import { Column, Header, Riga, Table } from 'src/app/models/Table';
import { SearchCommandStoredProduct } from 'src/app/models/command/storedProductCommand/SearchCommandStoredProduct';
import { } from 'src/app/models/dto/ListStoredProductsDTO';
import { Utility } from 'src/app/utils/Utility';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.scss'],
})
export class AdminProductsPage extends Utility implements OnInit {
  table!: Table;
  constructor(storedProductService: StoredProductService, private router: Router) {
    super(storedProductService);
  }

  async ngOnInit() {
    this.table = new Table();
    this.list = await super.startSearch();
    this.configHeader();
    this.configTable();
  }

  editRow(idProd: any) {
    this.router.navigate(['add-update-stored-product'], { queryParams: { product: idProd } });
  }

  configTable() {
    this.table = new Table()
    this.list.forEach((prod: StoredProduct) => {
      let row = new Riga();
      let colCodice = new Column();
      colCodice.nome = prod.codice;
      let colName = new Column();
      colName.nome = prod.nome;
      let colDesc = new Column();
      colDesc.nome = prod.descrizione;
      let colPrezzo = new Column();
      let colQta = new Column();
      colPrezzo.nome = prod.prezzo
      colQta.nome = prod.qta
      row.columns.push(colCodice, colName, colDesc, colPrezzo, colQta);
      this.table.rows.push(row);
    });
    this.table.hasActionsButton = true;
  }

  configHeader() {
    let headerNome = new Header();
    let headerDescrizione = new Header();
    let headerPrezzo = new Header();
    let headerQta = new Header();
    let headerCodice = new Header();
    headerNome.nome = "Nome";
    headerDescrizione.nome = "Descrizione";
    headerPrezzo.nome = "Prezzo";
    headerQta.nome = "Quantità";
    headerCodice.nome = "Codice prodotto";
    this.table.headers.push(headerCodice, headerNome, headerDescrizione, headerPrezzo, headerQta);

  }

  addStoredItem() {
    this.router.navigate(['add-update-stored-product']);
  }

  async changePage(event: any) {
    this.list = await super.changePaginatorValue(event);
    this.configTable();
  }

  async searchProducts(event: any) {
    const command: SearchCommandStoredProduct = new SearchCommandStoredProduct();
    command.nome = event.target.value;
    console.log(command)
    this.list = await this.startSearch(command);
    console.log(this.list)
    this.configTable();
  }

  async changeSize(event: any) {
    console.log(event.target.value);
    this.command.take = event.target.value;
    this.command.current = 0;
    this.list = await this.startSearch();
    this.configTable();
  }

  goBack() {
    this.router.navigate(['admin-home-page']);
  }

}
