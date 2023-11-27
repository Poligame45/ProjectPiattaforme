package com.lucapolizzo.market.models;

import com.lucapolizzo.market.models.entities.StoredProduct;
import lombok.Data;

@Data
public class BasketItem {
    private StoredProduct product;
    private Integer qta_acquistata;
}
