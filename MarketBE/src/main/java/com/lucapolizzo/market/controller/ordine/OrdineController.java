package com.lucapolizzo.market.controller.ordine;

import com.lucapolizzo.market.command.order.AddUpdateOrderCommand;
import com.lucapolizzo.market.command.order.GetDeleteOrderCommand;
import com.lucapolizzo.market.command.order.SearchOrderCommand;
import com.lucapolizzo.market.dto.orderDTO.ListOrderDTO;
import com.lucapolizzo.market.dto.orderDTO.OrderDTO;
import com.lucapolizzo.market.services.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@Slf4j
@CrossOrigin("http://localhost:8100")
public class OrdineController {

    @Autowired
    OrderService orderService;



    @PostMapping()
    public ResponseEntity<OrderDTO> addOrder(@RequestBody AddUpdateOrderCommand command) {
        OrderDTO orderDTO = orderService.addOrder(command);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }

    @PostMapping("/getOrder")
    public ResponseEntity<OrderDTO> getOrder(@RequestBody GetDeleteOrderCommand command) {
        OrderDTO orderDTO = orderService.getOrder(command);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);

    }


    @PostMapping("/searchOrderByCustomer")
    public ResponseEntity<ListOrderDTO> searchOrderByCustomer(@RequestBody SearchOrderCommand command) {
        ListOrderDTO listOrderDTO = orderService.searchOrder(command);
        return new ResponseEntity<>(listOrderDTO, HttpStatus.OK);
    }

}
