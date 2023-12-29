import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { StoredProduct } from 'src/app/models/StoredProduct';
import { Column, Header, Riga, Table } from 'src/app/models/Table';
import { GetDeleteStoredProductCommand } from 'src/app/models/command/storedProductCommand/GetDeleteStoredProductCommand';
import { SearchCommandStoredProduct } from 'src/app/models/command/storedProductCommand/SearchCommandStoredProduct';
import { } from 'src/app/models/dto/ListStoredProductsDTO';
import { StoredProductUtility } from 'src/app/utils/StoredProductUtility';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.scss'],
})
export class AdminProductsPage extends StoredProductUtility implements OnInit {
  table!: Table;
  constructor(storedProductService: StoredProductService, private router: Router) {
    super(storedProductService);
    this.router.events.subscribe(async (ev) => {
      if (ev instanceof NavigationEnd) {
        await this.startSearch();
      }
    });
  }

  async ngOnInit() {
    this.table = new Table();
    this.list = await super.startSearch();
    this.configTable();
    this.configHeader();
  }

  editProduct(idProd: any) {
    this.router.navigate(['add-update-stored-product'], { queryParams: { product: idProd } });
  }

  async deleteStoredProduct(idProd: any) {
    const command: GetDeleteStoredProductCommand = {
      codice: +idProd
    }
    const resp = await firstValueFrom(this.storedProductService.deleteStoredProduct(command));
    console.log(resp)
  }

  configTable() {
    this.table = new Table();
    this.table.hasActionsButton = true;
    this.table.hasEditButton = true;
    this.table.hasDeleteButton = true;
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
      colPrezzo.nome = prod.prezzo + "€";
      colQta.nome = prod.qta;
      row.columns.push(colCodice, colName, colDesc, colPrezzo, colQta);
      this.table.rows.push(row);
    });
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
    await super.goToPage(event, this.totProdotti);
    this.list = await super.startSearch();
    this.configTable();
    this.configHeader();
  }

  async searchProducts(event: any) {
    const command: SearchCommandStoredProduct = new SearchCommandStoredProduct();
    command.nome = event.target.value;
    this.list = await this.startSearch(command);
    this.configTable();
    this.configHeader();
  }

  async changeSize(event: any) {
    await super.changePageSize(event);
    this.configTable();
    this.configHeader();
  }
  goBack() {
    this.router.navigate(['admin-home-page']);
  }

}
