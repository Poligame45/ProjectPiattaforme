package com.lucapolizzo.market.command.basketItem;

import com.lucapolizzo.market.command.generic.GenericGetDeleteCommand;
import lombok.Data;

@Data
public class GetDeleteBasketItemCommand extends GenericGetDeleteCommand {
    private Integer codiceStoredProduct;
    private Integer codiceCustomer;
}
