import { StoredProductService } from './../../Services/stored-product.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utility } from 'src/app/utils/Utility';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent extends Utility {
  @Output() changePage: EventEmitter<any> = new EventEmitter();
  @Output() changeSize: EventEmitter<any> = new EventEmitter();
  @Input() itemsPerPages!: number;
  @Input() current!: number;

  constructor(storedProductService: StoredProductService) {
    super(storedProductService);
  }

  alertInputs: any = [
    {
      label: '10',
      type: 'radio',
      value: '10',
    },
    {
      label: '20',
      type: 'radio',
      value: '20',
    },
    {
      label: '50',
      type: 'radio',
      value: '50',
    },
  ]



  emitChangePage(event: any) {
    this.changePage.emit(event);
  }
  changeSizeOfPages(event: any) {
    this.changeSize.emit(event);
  }

}
