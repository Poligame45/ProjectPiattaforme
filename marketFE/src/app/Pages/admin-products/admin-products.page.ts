import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { StoredProduct } from 'src/app/models/StoredProduct';
import { Column, Header, Riga, Table } from 'src/app/models/Table';
import { SearchCommandStoredProduct } from 'src/app/models/command/storedProductCommand/SearchCommandStoredProduct';
import { ListStoredProductsDTO } from 'src/app/models/dto/ListStoredProductsDTO';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.scss'],
})
export class AdminProductsPage implements OnInit {
  table: Table = new Table();
  list!: ListStoredProductsDTO;
  constructor(private storedProductService: StoredProductService, private router: Router) { }

  async ngOnInit() {
    this.table = new Table();
    this.list = new ListStoredProductsDTO;
    const searchCommand: SearchCommandStoredProduct = {
      nome: "",
      current: 0,
      take: 10
    }
    this.list = await firstValueFrom(this.storedProductService.searchStoredProducts(searchCommand));
    this.configHeader();
    this.configTable();
  }

  configTable() {
    this.list.storedProductList.forEach((prod: StoredProduct) => {
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

}
