package com.lucapolizzo.market.command.basketItem;

import lombok.Data;

@Data
public class AddUpdateBasketItemCommand {
    private Integer codiceStoredProduct;
    private Integer codiceBasket;
    private Integer quantita;
}
