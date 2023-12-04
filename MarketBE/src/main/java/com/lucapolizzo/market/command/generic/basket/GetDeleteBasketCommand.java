package com.lucapolizzo.market.command.generic.basket;

import com.lucapolizzo.market.command.generic.GenericGetDeleteCommand;
import com.lucapolizzo.market.models.entities.User;
import lombok.Data;

@Data
public class GetDeleteBasketCommand extends GenericGetDeleteCommand {
    private User user;
}
