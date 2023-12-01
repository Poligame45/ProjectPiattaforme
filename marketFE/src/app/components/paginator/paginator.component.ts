import { StoredProductService } from './../../Services/stored-product.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Utility } from 'src/app/utils/Utility';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent extends Utility implements OnInit {
  @Output() changePage: EventEmitter<any> = new EventEmitter();
  @Input() current!: number;
  @Input() nProdotti!: number;
  @Input() take!: number;
  totPagine!:number;

  constructor(storedProductService: StoredProductService) {
    super(storedProductService);
  }

  ngOnInit() {
  }

  emitChangePage(event: any) {
    this.changePage.emit(event);
  }

}
