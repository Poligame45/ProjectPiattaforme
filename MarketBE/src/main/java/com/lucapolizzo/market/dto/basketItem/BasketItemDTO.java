package com.lucapolizzo.market.dto.basketItem;

import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.StoredProduct;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class BasketItemDTO {

    private int id;
    private Basket carrello;
    private StoredProduct storedProduct;
    private int quantita;
}
