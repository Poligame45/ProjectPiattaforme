package com.lucapolizzo.market.command.basketItem;

import lombok.Data;

@Data
public class AddUpdateBasketItemCommand {
    private Integer codiceStoredProduct;
    private Integer codiceCustomer;
    private Integer quantita;
}
