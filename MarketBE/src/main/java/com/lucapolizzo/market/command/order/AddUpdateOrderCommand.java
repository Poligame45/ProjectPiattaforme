package com.lucapolizzo.market.command.order;

import com.lucapolizzo.market.models.entities.Basket;
import com.lucapolizzo.market.models.entities.PurchasedItem;
import lombok.Data;

import java.util.List;

@Data
public class AddUpdateOrderCommand {
    private Integer customerId;
}
