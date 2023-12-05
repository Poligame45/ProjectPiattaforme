package com.lucapolizzo.market.repositories;

import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.BasketItem;
import com.lucapolizzo.market.models.entities.StoredProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;

@EnableJpaRepositories
public interface BasketItemRepository extends JpaRepository<BasketItem,Integer> {

    Optional<BasketItem> getBasketItemByStoredProductAndCarrello(StoredProduct storedProduct, Basket carrello);
}
