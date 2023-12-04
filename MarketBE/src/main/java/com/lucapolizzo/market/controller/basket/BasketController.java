/*package com.lucapolizzo.market.controller.basket;

import com.lucapolizzo.market.command.generic.basket.GetDeleteBasketCommand;
import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.repositories.BasketRepository;
import com.lucapolizzo.market.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/basket")
@Slf4j
@CrossOrigin("http://localhost:8100")
public class BasketController {
    @Autowired
    BasketRepository basketRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public int addProdotto(@RequestBody GetDeleteBasketCommand command) {
        command.getUser().getBasket();
    }
}*/
