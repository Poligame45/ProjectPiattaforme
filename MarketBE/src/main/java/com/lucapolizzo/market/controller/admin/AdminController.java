package com.lucapolizzo.market.controller.admin;


import com.lucapolizzo.market.command.auth.AuthenticationCommand;
import com.lucapolizzo.market.command.auth.RegisterCommand;
import com.lucapolizzo.market.command.order.GetDeleteOrderCommand;
import com.lucapolizzo.market.command.order.SearchOrderCommand;
import com.lucapolizzo.market.command.user.SearchUserCommand;
import com.lucapolizzo.market.dto.auth.AuthenticationDTO;
import com.lucapolizzo.market.dto.orderDTO.ListOrderDTO;
import com.lucapolizzo.market.dto.orderDTO.OrderDTO;
import com.lucapolizzo.market.dto.user.ListUserDTO;
import com.lucapolizzo.market.dto.user.UserDTO;
import com.lucapolizzo.market.models.entities.Order;
import com.lucapolizzo.market.repositories.OrderRepository;
import com.lucapolizzo.market.repositories.UserRepository;
import com.lucapolizzo.market.services.AuthenticationService;
import com.lucapolizzo.market.services.OrderService;
import com.lucapolizzo.market.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:8100")
public class AdminController {

   @Autowired
    UserService userService;

    @Autowired
    OrderService orderService;

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/searchUsers")
        public ResponseEntity<ListUserDTO> searchUsers(@RequestBody SearchUserCommand command) {
        ListUserDTO listUserDTO = userService.searchUsers(command);
        return new ResponseEntity<>(listUserDTO, HttpStatus.OK);

    }

    @PostMapping("/searchOrders")
    public ResponseEntity<ListOrderDTO> searchOrders(@RequestBody SearchOrderCommand command) {
        ListOrderDTO listOrderDTO = orderService.searchOrder(command);
        return new ResponseEntity<>(listOrderDTO, HttpStatus.OK);
    }

    @PostMapping("/deleteOrder")
    public ResponseEntity<OrderDTO> searchOrders(@RequestBody GetDeleteOrderCommand command) {
        OrderDTO orderDTO = orderService.deleteOrder(command);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }

    @PostMapping("/adminRegister")
    public ResponseEntity<AuthenticationDTO> adminRegister(@RequestBody RegisterCommand command) {
        AuthenticationDTO admin = authenticationService.register(command);
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

}
