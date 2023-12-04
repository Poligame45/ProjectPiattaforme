package com.lucapolizzo.market.controller.basketItem;

import com.lucapolizzo.market.command.AddUpdateBasketItemCommand;
import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.BasketItem;
import com.lucapolizzo.market.models.entities.StoredProduct;
import com.lucapolizzo.market.repositories.BasketItemRepository;
import com.lucapolizzo.market.repositories.BasketRepository;
import com.lucapolizzo.market.repositories.StoredProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/basket")
@Slf4j
@CrossOrigin("http://localhost:8100")
public class BasketItemController {

    @Autowired
    BasketItemRepository basketItemRepository;

    @Autowired
    StoredProductRepository storedProductRepository;
    @Autowired
    BasketRepository basketRepository;


    @PostMapping("/addProdotto")
    public int addProdotto(@RequestBody AddUpdateBasketItemCommand command) {
        StoredProduct storedProduct = storedProductRepository.findById(command.getCodiceStoredProduct()).orElseThrow();
        Basket basket = basketRepository.findById(command.getCodiceBasket()).orElseThrow();
        Optional<BasketItem> item = basketItemRepository.getBasketItemByStoredProductAndCarrello(storedProduct, basket);
        if (item.isPresent()) {
            BasketItem item1 = item.get();
            for (BasketItem item2 : basket.getBasketItems()) {
                if (item2.getId() == item1.getId()) {
                    item2.setQuantita(item1.getQuantita() + 1);
                    basketRepository.save(basket);
                    return 1;
                }
            }
        }
        BasketItem basketItem = new BasketItem();
        basketItem.setQuantita(1);
        basketItem.setStoredProduct(storedProduct);
        basketItem.setCarrello(basket);
        basketItemRepository.save(basketItem);
        basketRepository.save(basket);
        return 1;
    }
}
