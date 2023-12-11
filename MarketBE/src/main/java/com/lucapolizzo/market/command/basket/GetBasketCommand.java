package com.lucapolizzo.market.command.basket;

import com.lucapolizzo.market.command.generic.GenericGetDeleteCommand;
import lombok.Data;

@Data
public class GetBasketCommand extends GenericGetDeleteCommand {
    private Integer customerId;
}
