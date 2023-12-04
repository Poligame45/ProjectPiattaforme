package com.lucapolizzo.market.command;

import lombok.Data;

@Data
public class AddUpdateBasketItemCommand {
    private Integer codiceStoredProduct;
    private Integer codiceBasket;
}
