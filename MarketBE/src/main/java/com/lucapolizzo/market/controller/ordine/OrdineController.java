package com.lucapolizzo.market.controller.ordine;

import com.lucapolizzo.market.command.order.AddUpdateOrderCommand;
import com.lucapolizzo.market.models.entities.Order;
import com.lucapolizzo.market.services.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@Slf4j
@CrossOrigin("http://localhost:8100")
public class OrdineController {

    @Autowired
    OrderService orderService;

    @PostMapping()
    public Order addOrder (@RequestBody AddUpdateOrderCommand command){
        return orderService.addOrder(command);
    }
}
