import { StoredProductService } from './../../Services/stored-product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Paginator } from 'src/app/utils/Paginator';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent extends Paginator implements OnInit   {
  @Output() changePage: EventEmitter<any> = new EventEmitter();

  constructor( storedProductService:StoredProductService) {
    super(storedProductService);
    if(this.totProdotti > 0){
      this.paginator.hasNext = true;
    }
  }

  ngOnInit() { }

  emitChangePage(event:any) {
      this.changePage.emit(event);
  }
  

}
