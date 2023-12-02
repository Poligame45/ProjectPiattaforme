import { Component, Input, OnInit } from '@angular/core';
import { StoredProductService } from 'src/app/Services/stored-product.service';
import { StoredProduct } from 'src/app/models/StoredProduct';
import { SearchCommandStoredProduct } from 'src/app/models/command/SearchCommandStoredProduct';
import { Utility } from 'src/app/utils/Utility';

@Component({
  selector: 'main-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  @Input() list!: Array<StoredProduct>;

  constructor() {
  }




}
