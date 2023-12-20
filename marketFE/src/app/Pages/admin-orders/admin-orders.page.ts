import { SearchOrdersCommand } from 'src/app/models/command/orderCommand/searchOrderCommand';
import { OrdersService } from './../../Services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage implements OnInit {

  constructor(private orderService:OrdersService) { }

  ngOnInit() {
    const command:SearchOrdersCommand = new SearchOrdersCommand();
    console.log(this.orderService.searchOrders(command).subscribe((val)=>{
      console.log(val)
    }))
  }


}
