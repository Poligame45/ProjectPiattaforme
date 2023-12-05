package com.lucapolizzo.market.controller.basket;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lucapolizzo.market.command.basket.GetBasketCommand;
import com.lucapolizzo.market.command.basketItem.AddUpdateBasketItemCommand;
import com.lucapolizzo.market.command.basketItem.GetDeleteBasketItemCommand;
import com.lucapolizzo.market.dto.basket.BasketDTO;
import com.lucapolizzo.market.dto.basketItem.BasketItemDTO;
import com.lucapolizzo.market.services.BasketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/basket")
@Slf4j
@CrossOrigin("http://localhost:8100")
public class BasketController {


    @Autowired
    BasketService basketService;


    @PostMapping("/getBasket")
    public ResponseEntity<BasketDTO> getBasket(@RequestBody GetBasketCommand command){
        BasketDTO basketDTO = basketService.getBasket(command);
        return new ResponseEntity<>(basketDTO, HttpStatus.OK);
    }
    @PostMapping("/addItemInBasket")
    public ResponseEntity<BasketItemDTO> addItemInBasket(@RequestBody AddUpdateBasketItemCommand command)  {
        BasketItemDTO basketItemDTO = basketService.addProductInBasket(command);
        return new ResponseEntity<>(basketItemDTO, HttpStatus.OK);
    }


    @PostMapping("/removeBasketItem")
    public ResponseEntity<BasketItemDTO> removeBasketItem(@RequestBody GetDeleteBasketItemCommand command) {
        BasketItemDTO basketItemDTO = basketService.removeBasketItem(command);
        return new ResponseEntity<>(basketItemDTO, HttpStatus.OK);
    }

    @PostMapping("/updateBasketItemQuantity")
    public ResponseEntity<BasketItemDTO> updateBasketItemQuantity(@RequestBody AddUpdateBasketItemCommand command) {
        BasketItemDTO basketItemDTO = basketService.updateBasketQuantity(command);
        return new ResponseEntity<>(basketItemDTO, HttpStatus.OK);
    }
}
