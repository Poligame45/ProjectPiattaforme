import { Component, OnInit } from '@angular/core';
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
  constructor(private storedProductService: StoredProductService) { }

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
    console.log(this.table)
  }

  configTable() {
    this.list.storedProductList.forEach((prod:StoredProduct) => {
      let row = new Riga();
      let colName = new Column();
      colName.nome = prod.nome;
      let colDesc = new Column();
      colDesc.nome = prod.descrizione;
      let colImg = new Column();
      let colPrezzo = new Column();
      let colQta = new Column();
      colImg.nome = prod.img
      colPrezzo.nome = prod.prezzo
      colQta.nome = prod.qta
      row.columns.push(colName, colDesc, colImg, colPrezzo, colQta);
      this.table.rows.push(row);
    });
    // this.table.hasActionsButton = true;
  }

  configHeader() {
    let headerNome = new Header();
    let headerDescrizione = new Header();
    let headerImg = new Header();
    let headerPrezzo = new Header();
    let headerQta = new Header();
    headerNome.nome = "Nome";
    headerDescrizione.nome = "Descrizione";
    headerImg.nome = "Img";
    headerPrezzo.nome = "Prezzo";
    headerQta.nome = "Quantità";

    this.table.headers.push(headerNome, headerDescrizione, headerImg, headerPrezzo, headerQta);

  }

}
